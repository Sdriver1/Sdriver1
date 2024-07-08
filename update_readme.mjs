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
    const response = await fetch("https://api.pridebot.xyz/api/stats");
    const data = await response.json();

    return {
      currentGuildCount: data.currentGuildCount,
    };
  } catch (error) {
    console.error("Error fetching bot stats:", error);
    return {
      currentGuildCount: 0,
    };
  }
}

async function updateReadme() {
  const username = "Sdriver1";
  const languages = await getLanguageStats(username);
  const stats = await getGitHubStats(username);
  const botStats = await getBotStats();

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
          value: \`- 16 years 
                  - Male, He/Him 
                  - Pansexual, Omniromantic
                  - Taken 💖 ~ 11/04/24\`,
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
          value: \`- Pridebot - Verified Discord bot, ${botStats.currentGuildCount} servers 
                  - Prisma Bot - Main bot for Prismatic Discord Server (.gg/friendship)\`,
        },
        {
          name: \`Websites\`,
          value: \`- https://pridebot.xyz - Website for Pridebot
                  - https://sdriver1.me - Personal website\`,
        },
        {
          name: \`Servers\`,
          value: \` *coming soon* \`,
        },
        {
          name: \`Socials\`,
          value: \`- Discord - @sdriver1
                  - Tiktok - @sdriver75
                  - Insta - @sdriver_1
                  - X/Twitter - @Sdriver110\`,
        },
      ])
      .setColor("#FF00EA") // Favorite color
      .setThumbnail("https://sdriver1.me/profile.png")
      .setTimestamp();

    await human.reply({ embeds: [Readme] });
  },
};
\`\`\`
  `;

  fs.writeFileSync("README.md", readmeContent);
  console.log("README.md updated successfully");
}

updateReadme().catch((error) => console.error("Error in updateReadme:", error));
