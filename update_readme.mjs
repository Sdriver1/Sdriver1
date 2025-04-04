import { Octokit } from "@octokit/rest";
import fs from "fs";
import fetch from "node-fetch";
import dotenv from "dotenv";
dotenv.config();

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

async function getRepositories(username) {
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
  } catch (error) {
    console.error("Error fetching repositories:", error);
  }

  return repos;
}

async function getLanguageStats(username) {
  let languageTotals = {};

  try {
    const repos = await getRepositories(username);

    for (const repo of repos) {
      if (
        (!repo.permissions.admin && !repo.permissions.push)
      ) {
        console.log(`Skipping private repo: ${repo.name}`);
        continue;
      }

      try {
        const { data } = await octokit.repos.listLanguages({
          owner: repo.owner.login,
          repo: repo.name,
        });

        for (const [language, bytes] of Object.entries(data)) {
          languageTotals[language] = (languageTotals[language] || 0) + bytes;
        }
      } catch (error) {
        console.error(`Error fetching languages for ${repo.name}:`, error);
      }
    }
  } catch (error) {
    console.error("Error fetching language stats:", error);
  }

  const totalBytes = Object.values(languageTotals).reduce((a, b) => a + b, 0);
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
    const repos = await getRepositories(username);

    let stars = 0;
    let commits = 0;

    for (const repo of repos) {
      if (
        [
          "Sdriver1",
        ].includes(repo.name)
      ) {
        console.log(`Skipping repo: ${repo.name}`);
        continue;
      }

      try {
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
        commits += commitsList.length;
      } catch (error) {
        console.error(`Error fetching stars/commits for ${repo.name}:`, error);
      }
    }

    stats = {
      followers: userData.followers || 0,
      total_repos: (userData.public_repos || 16) + (orgData.public_repos || 2) + 3,
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
    prismatotal: 0,
    obbytotal: 0,
    portalGuildCount: 0,
    portalUserCount: 0,
  };

  try {
    const prideresponse = await fetch("http://2.56.246.53:2610/githubapi");
    const data = await prideresponse.json();
    Object.assign(stats, {
      currentGuildCount: formatUserCount(data.currentGuildCount),
      totalUserCount: formatUserCount(data.totalUserCount),
      prismatotal: formatUserCount(data.prismatotal),
      obbytotal: formatUserCount(data.obbytotal),
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

function calculateMonthsTogether(anniversary) {
  const today = new Date();
  const anniversaryDate = new Date(anniversary);
  let months =
    (today.getFullYear() - anniversaryDate.getFullYear()) * 12 +
    today.getMonth() -
    anniversaryDate.getMonth();

  if (today.getDate() < anniversaryDate.getDate()) {
    months--;
  }

  return months;
}

async function getYANGstats() {
  let stats = { visits: 0, clicks: 0 };

  try {
    const vresponse = await fetch("https://youarenow.gay/api/visits");
    const vdata = await vresponse.json();
    stats.visits = formatUserCount(vdata.visits);
  } catch (error) {
    console.error("Error fetching YANG visits:", error);
  }

  try {
    const cresponse = await fetch("https://youarenow.gay/api/clicks");
    const cdata = await cresponse.json();
    stats.clicks = formatUserCount(cdata.clicks);
  } catch (error) {
    console.error("Error fetching YANG clicks:", error);
  }

  return stats;
}

function formatUserCount(count) {
  return count >= 1000
    ? (count / 1000).toFixed(1) + "k+"
    : count.toLocaleString();
}

async function updateReadme() {
  const username = "Sdriver1";
  const age = calculateAge("2007-08-04");
  const monthsTogether = calculateMonthsTogether("2023-11-04");

  const [languages, stats, botStats, yang] = await Promise.all([
    getLanguageStats(username),
    getGitHubStats(username),
    getBotStats(),
    getYANGstats(),
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
                  - Taken 💖 ~ 11/04/23 (${monthsTogether} months)
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
          value: \` // JavaScript
                  - Pridebot - Your Discord bot to LGBTQ Identities | ${botStats.currentGuildCount} servers / ${botStats.totalUserCount} users
                  - Pridebot Manager - A utility bot for Pridebot Support Server
                  - PortalBot - Network/Chat bot for PortalBot network | ${botStats.portalGuildCount} servers / ${botStats.portalUserCount} users
                  - AntiForward - Discord bot designed to keep forwarded messages out of your server (Offline)
                  
                  // TypeScript
                  - Prisma Bot - Main bot for Prismatic Discord Server (.gg/friendship) / ${botStats.prismatotal} members
                  - Economy Bot - Economy/Shop bot designed for Obby Street (.gg/xxs) / ${botStats.obbytotal} members (Offline)\`,
        },
        {
          name: \`Project\`,
          value: \`- Center.chat - *coming soon*
                  - DevEco - discord.gg/deveco\`,
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
                  - https://youarenow.gay - Turn you and your friends gay | ${yang.visits} visits / ${yang.clicks} "ungay" clicks
                  - https://sdriver1.me/calculator - Small graphing calculator with easy to use UI

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
      .setThumbnail("https://pfp.pridebot.xyz/691506668781174824/omnisexualpansexual.png")
      .setTimestamp();

    await human.reply({ embeds: [Readme] });
  },
};
\`\`\`

*This README is updated every day*
  `;

  fs.writeFileSync("README.md", readmeContent);
  console.log("README.md updated successfully");
}

updateReadme().catch((error) => console.error("Error in updateReadme:", error));
