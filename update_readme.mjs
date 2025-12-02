import { Octokit } from "@octokit/rest";
import fs from "fs";
import fetch from "node-fetch";
import dotenv from "dotenv";
dotenv.config();

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

const commitExcludeRepos = ["Pridebot-Systems/.github", "Sdriver1/Pridebot"];

async function getRepositories(username, orgs = []) {
  let repos = [];
  let response;
  let page = 1;

  try {
    do {
      response = await octokit.repos.listForUser({
        username,
        type: "all",
        sort: "updated",
        per_page: 100,
        page,
      });

      if (response && response.data) {
        repos = repos.concat(response.data);
        page++;
      } else {
        throw new Error("Invalid response from GitHub API");
      }
    } while (response.data.length === 100);
    console.log(
      `[REPOS] Total personal repos fetched for ${username}: ${repos.length}`
    );
  } catch (error) {
    console.error("Error fetching personal repositories:", error);
  }

  for (const org of orgs) {
    page = 1;
    try {
      let orgReposCount = 0;
      do {
        response = await octokit.repos.listForOrg({
          org,
          type: "all",
          sort: "updated",
          per_page: 100,
          page,
        });

        if (response && response.data) {
          repos = repos.concat(response.data);
          orgReposCount += response.data.length;
          page++;
        } else {
          throw new Error("Invalid response from GitHub API");
        }
      } while (response.data.length === 100);
      console.log(
        `[REPOS] Total org repos fetched for ${org}: ${orgReposCount}`
      );
    } catch (error) {
      console.error(`Error fetching repositories for org ${org}:`, error);
    }
  }

  console.log(`[REPOS] Total combined repos: ${repos.length}`);
  return repos;
}

async function getLanguageStats(username) {
  let languageTotals = {};

  const repos = await getRepositories(username, ["Pridebot-Systems"]);

  for (const repo of repos) {
    if (
      (!repo.permissions.admin && !repo.permissions.push) ||
      (repo.owner.login === "Sdriver1" &&
        repo.name === "consulting.thedeveco.com")
    ) {
      console.log(
        `[LANGUAGES] Skipping repo: ${repo.full_name} (No push/admin or blacklisted)`
      );
      continue;
    }

    console.log(`[LANGUAGES] Counting languages in repo: ${repo.full_name}`);

    try {
      const { data } = await octokit.repos.listLanguages({
        owner: repo.owner.login,
        repo: repo.name,
      });

      for (const [language, bytes] of Object.entries(data)) {
        languageTotals[language] = (languageTotals[language] || 0) + bytes;
      }
      if (Object.keys(data).length === 0) {
        console.log(
          `[LANGUAGES] No language data found in repo: ${repo.full_name}`
        );
      }
    } catch (error) {
      console.error(
        `[LANGUAGES] Error fetching languages for ${repo.name}:`,
        error
      );
    }
  }

  console.log(`[LANGUAGES] Final language totals:`, languageTotals);

  const totalBytes = Object.values(languageTotals).reduce((a, b) => a + b, 0);
  if (totalBytes === 0) {
    console.warn(
      "[LANGUAGES] No bytes counted at all! Are you filtering out too many repos?"
    );
  }
  return Object.entries(languageTotals)
    .map(([language, bytes]) => ({
      language,
      percentage: ((bytes / totalBytes) * 100).toFixed(2),
    }))
    .sort((a, b) => b.percentage - a.percentage);
}

async function getGitHubStats(username) {
  let stats = {
    followers: 0,
    total_repos: 0,
    stars: 0,
    commits: 0,
  };

  try {
    const userResponse = await fetch(
      `https://api.github.com/users/${username}`
    );
    const orgResponse = await fetch(
      `https://api.github.com/orgs/Pridebot-Systems`
    );

    const userData = await userResponse.json();
    const orgData = await orgResponse.json();
    const repos = await getRepositories(username, ["Pridebot-Systems"]);

    let stars = 0;
    let commits = 0;

    for (const repo of repos) {
      if (["Sdriver1", "consulting.thedeveco.com"].includes(repo.name)) {
        console.log(`[COMMITS] Skipping repo: ${repo.name}`);
        continue;
      }

      if (commitExcludeRepos.includes(repo.full_name)) {
        console.log(`[COMMITS] Skipping commit count for: ${repo.full_name}`);
        try {
          const stargazers = await octokit.activity.listStargazersForRepo({
            owner: repo.owner.login,
            repo: repo.name,
            per_page: 100,
          });
          stars += stargazers.data.length;
        } catch (error) {
          console.error(
            `[COMMITS] Error fetching stars for ${repo.full_name}:`,
            error
          );
        }
        continue;
      }

      try {
        console.log(
          `[COMMITS] Counting stars and commits in repo: ${repo.full_name}`
        );

        const stargazers = await octokit.activity.listStargazersForRepo({
          owner: repo.owner.login,
          repo: repo.name,
          per_page: 100,
        });
        stars += stargazers.data.length;

        const commitsList = await octokit.paginate(octokit.repos.listCommits, {
          owner: repo.owner.login,
          repo: repo.name,
          per_page: 100,
        });
        console.log(
          `[COMMITS] Fetched ${commitsList.length} commits from ${repo.full_name}`
        );
        commits += commitsList.length;
      } catch (error) {
        console.error(`[COMMITS] Error for ${repo.full_name}:`, error);
      }
    }

    console.log(`[COMMITS] Final total commits counted: ${commits}`);
    console.log(`[COMMITS] Final total stars counted: ${stars}`);

    stats = {
      followers: userData.followers || 0,
      total_repos:
        (userData.public_repos || 16) + (orgData.public_repos || 2) + 3,
      stars,
      commits,
    };
  } catch (error) {
    console.error("Error fetching GitHub stats:", error);
  }

  return stats;
}

async function getBotStats() {
  let stats = {
    currentGuildCount: 0,
    totalUserCount: 0,
    portalGuildCount: 0,
    portalUserCount: 0,
  };

  try {
    const prideresponse = await fetch("http://2.56.246.53:2610/githubapi");
    const data = await prideresponse.json();
    Object.assign(stats, {
      currentGuildCount: formatUserCount(data.currentGuildCount),
      totalUserCount: formatUserCount(data.totalUserCount),
    });
  } catch (error) {
    console.error("Error fetching Pridebot stats:", error);
  }

  try {
    const portalresponse = await fetch("https://api.portalnet.work/stats");
    const portaldata = await portalresponse.json();
    Object.assign(stats, {
      portalGuildCount: formatUserCount(portaldata.currentGuildCount),
      portalUserCount: formatUserCount(portaldata.totalUserCount),
    });
  } catch (error) {
    console.error("Error fetching Portalbot stats:", error);
  }

  return stats;
}

function calculateAge(birthday) {
  const today = new Date();
  const birthDate = new Date(birthday);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDifference = today.getMonth() - birthDate.getMonth();

  if (
    monthDifference < 0 ||
    (monthDifference === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age;
}

// function calculateMonthsTogether(anniversary) {
//   const today = new Date();
//   const anniversaryDate = new Date(anniversary);
//   let months =
//     (today.getFullYear() - anniversaryDate.getFullYear()) * 12 +
//     today.getMonth() -
//     anniversaryDate.getMonth();

//   if (today.getDate() < anniversaryDate.getDate()) {
//     months--;
//   }

//   return months;
// }

// - Taken 💖 ~ 11/04/23 (${monthsTogether} months)

async function updateBotStats(languages, stats, botStats, yang, age) {
  try {
    const botStatsUpdate = {
      personal: {
        age: age,
        pronouns: "He/Him",
        sexuality: "Pansexual, Omniromantic",
        job: "Software Developer Intern @ devEco Consulting",
      },
      languages: {},
      github: {
        followers: stats.followers,
        totalRepos: stats.total_repos,
        stars: stats.stars,
        commits: stats.commits,
      },
      bots: {
        pridebot: {
          servers: formatUserCount(botStats.currentGuildCount),
          users: formatUserCount(botStats.totalUserCount),
        },
        portalbot: {
          servers: formatUserCount(botStats.portalGuildCount),
          users: formatUserCount(botStats.portalUserCount),
        },
      },
    };

    // Convert languages array to object
    languages.forEach((lang) => {
      botStatsUpdate.languages[lang.language] = parseFloat(lang.percentage);
    });

    console.log("[BOT UPDATE] Sending stats to Discord bot...");

    const response = await fetch(
      "https://sbot1.api.sdriver1.me/update-driver-stats",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.BOT_UPDATE_TOKEN}`,
        },
        body: JSON.stringify(botStatsUpdate),
      }
    );

    if (response.ok) {
      const result = await response.json();
      console.log(
        "[BOT UPDATE] Successfully updated bot stats:",
        result.message
      );
    } else {
      const error = await response.text();
      console.error("[BOT UPDATE] Failed to update bot stats:", error);
    }
  } catch (error) {
    console.error("[BOT UPDATE] Error updating bot stats:", error.message);
  }
}

function formatUserCount(count) {
  return count >= 1000
    ? (count / 1000).toFixed(1) + "k+"
    : count.toLocaleString();
}

async function updateReadme() {
  const username = "Sdriver1";
  const age = calculateAge("2007-08-04");
  // const monthsTogether = calculateMonthsTogether("2023-11-04");

  const [languages, stats, botStats, yang] = await Promise.all([
    getLanguageStats(username),
    getGitHubStats(username),
    getBotStats(),
  ]);

  const languagesString = languages
    .map((lang) => `- ${lang.language.padEnd(10)} (${lang.percentage}%)`)
    .join("\n" + " ".repeat(18));

  let readmeContent = `
\`\`\`javascript
const { ReadmeBuilder, ReadmeContentBuilder } = require("Github.js");

module.exports = {
  data: new ReadmeContentBuilder()
    .setName("whoisdriver")
    .setDescription("Info on Sdriver1"),

  async execute(interaction, client) {
    const Readme = new ReadmeBuilder()
      .setTitle(\`Hello I am Driver 👋\`)
      .setDescription(\`Here are some facts about me\`)
      .setFields([
        {
          name: \`Who is Driver\`,
          value: \`- ${age} years old
                  - Male, He/Him 
                  - Pansexual, Omniromantic
                  - Software Developer Intern @ devEco Consulting\`,
        },
        {
          name: \`Languages\`,
          value: \`${languagesString}\`,
        },
        {
          name: \`GitHub Stats\`,
          value: \`- Followers:    ${stats.followers}
                  - Total Repos:  ${stats.total_repos}
                  - Stars:        ${stats.stars}
                  - Commits:      ${stats.commits}\`,
        },
        {
          name: \`Bot Development\`,
          value: \`
                  - Pridebot - Your Discord bot to LGBTQ Identities | ${botStats.currentGuildCount} servers / ${botStats.totalUserCount} users
                  - Pridebot Manager - A utility bot for Pridebot Support Server
                  - PortalBot - Network/Chat bot for PortalBot network | ${botStats.portalGuildCount} servers / ${botStats.portalUserCount} users
                  - AntiForward - Discord bot designed to keep forwarded messages out of your server (Offline)\`,
        },
        {
          name: \`MC Project\`,
          value: \`- Pingbriel - Custom minecraft plugin for [Pridecord](https://discord.gg/lgbtqia)
                  - PridebotMC - Custom minecraft plugin for Fabric 1.21+ with favorite pridebot features\`,
        },
        {
          name: \`Websites\`,
          value: \`// Personal Websites
                  - https://sdriver1.me
                  - https://stevendriver.com
                  
                  // Bot Websites
                  - https://pridebot.xyz - Pridebot
                  - https://portalnet.work - PortalBot
                  
                  // Fun Websites
                  - https://youarenow.gay - Turn you and your friends gay

                  // Help Contributed too
                  - https://youdeservetolive.org - Mental health site made by teens for teens. In honor of Joshua Blackledge
                  \`,
        },
        {
          name: \`Socials\`,
          value: \`- Discord - @sdriver1
                  - Tiktok - @sdriver75
                  - Insta - @sdriver_1
                  - Linkedin - https://sdriver1.me/linkedin\`,
        },
      ])
      .setColor("#FF00EA") // Favorite color
      .setThumbnail("https://images.sdriver1.me/profile.png")
      .setTimestamp();

    await human.reply({ embeds: [Readme] });
  },
};
\`\`\`

*This README is updated every day*
  `;

  fs.writeFileSync("README.md", readmeContent);
  console.log("README.md updated successfully");
  await updateBotStats(languages, stats, botStats, yang, age);
}

updateReadme().catch((error) => console.error("Error in updateReadme:", error));
