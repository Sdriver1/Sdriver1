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

    return repos;
  } catch (error) {
    console.error("Error fetching repositories:", error);
    return [];
  }
}

async function getLanguageStats(username) {
  try {
    const repos = await getRepositories(username);
    let languageTotals = {};

    for (const repo of repos) {
      if (
        (!repo.permissions.admin && !repo.permissions.push) ||
        repo.name === "portalBot-metadata" ||
        repo.name === "portalnet.work" ||
        repo.name === "portalDocs"
      ) {
        console.log(`Skipping private repo: ${repo.name}`);
        continue;
      }

      const { data } = await octokit.repos.listLanguages({
        owner: username,
        repo: repo.name,
      });

      for (const [language, bytes] of Object.entries(data)) {
        if (languageTotals[language]) {
          languageTotals[language] += bytes;
        } else {
          languageTotals[language] = bytes;
        }
      }
    }

    const totalBytes = Object.values(languageTotals).reduce((a, b) => a + b, 0);

    let stats = [];
    for (const [language, bytes] of Object.entries(languageTotals)) {
      stats.push({
        language,
        percentage: ((bytes / totalBytes) * 100).toFixed(2),
      });
    }

    stats.sort((a, b) => b.percentage - a.percentage);

    return stats;
  } catch (error) {
    console.error("Error fetching language stats:", error);
    return [];
  }
}

async function getGitHubStats(username) {
  try {
    const userResponse = await fetch(
      `https://api.github.com/users/${username}`
    );
    const userData = await userResponse.json();

    const repos = await getRepositories(username);

    let stars = 0;
    let commits = 0;
    for (const repo of repos) {
      if (
        repo.name === "Sdriver1" ||
        repo.name === "portalBot-metadata" ||
        repo.name === "portalnet.work" ||
        repo.name === "portalDocs"
      ) {
        console.log(`Skipping repo: ${repo.name}`);
        continue;
      }

      const stargazers = await octokit.activity.listStargazersForRepo({
        owner: username,
        repo: repo.name,
        per_page: 100,
      });
      stars += stargazers.data.length;

      const commitsList = await octokit.paginate(octokit.repos.listCommits, {
        owner: username,
        repo: repo.name,
        per_page: 100,
      });
      commits += commitsList.length;
    }

    const totalRepos =
      userData.public_repos + (userData.total_private_repos || 0);

    const stats = {
      followers: userData.followers,
      total_repos: totalRepos,
      stars,
      commits,
    };
    return stats;
  } catch (error) {
    console.error("Error fetching GitHub stats:", error);
    return {
      followers: 0,
      total_repos: 0,
      stars: 0,
      commits: 0,
    };
  }
}

async function getBotStats() {
  try {
    const prideresponse = await fetch("http://2.56.246.53:2610/githubapi");
    const portalresponse = await fetch("https://api.jer.cx/stats");
    const data = await prideresponse.json();
    const portaldata = await portalresponse.json();

    return {
      currentGuildCount: formatUserCount(data.currentGuildCount),
      totalUserCount: formatUserCount(data.totalUserCount),
      prismatotal: formatUserCount(data.prismatotal),
      obbytotal: formatUserCount(data.obbytotal),
      portalGuildCount: formatUserCount(portaldata.currentGuildCount),
      portalUserCount: formatUserCount(portaldata.totalUserCount),
    };
  } catch (error) {
    console.error("Error fetching bot stats:", error);
    return {
      currentGuildCount: 0,
    };
  }
}

async function getYANGstats() {
  try {
    const vresponse = await fetch("https://youarenow.gay/api/visits");
    const cresponse = await fetch("https://youarenow.gay/api/clicks");
    const vdata = await vresponse.json();
    const cdata = await cresponse.json();

    return {
      visits: formatUserCount(vdata.visits),
      clicks: formatUserCount(cdata.clicks),
    };
  } catch (error) {
    console.error("Error fetching YANG stats:", error);
    return {
      visits: 0,
      clicks: 0,
    };
  }
}

function formatUserCount(count) {
  if (count >= 1000) {
    return (count / 1000).toFixed(1) + "k+";
  }
  return count.toLocaleString();
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

async function updateReadme() {
  const username = "Sdriver1";
  const age = calculateAge("2007-08-04");
  const monthsTogether = calculateMonthsTogether("2023-11-04");
  const languages = await getLanguageStats(username);
  const stats = await getGitHubStats(username);
  const botStats = await getBotStats();
  const yang = await getYANGstats();

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
                  - PortalBot - Network/Chat bot for PortalBot network | ${botStats.portalGuildCount} servers / ${botStats.portalUserCount} users
                  - AntiForward - Discord bot designed to keep forwarded messages out of your server
                  
                  // TypeScript
                  - Prisma Bot - Main bot for Prismatic Discord Server (.gg/friendship) / ${botStats.prismatotal} members
                  - Economy Bot - Economy/Shop bot designed for Obby Street (.gg/xxs) / ${botStats.obbytotal} members\`,
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
