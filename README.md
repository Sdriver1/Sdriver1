
```javascript
const { ReadmeBuilder, ReadmeContentBuilder } = require("Github.js");

module.exports = {
  data: new ReadmeContentBuilder()
    .setName("whoisdriver")
    .setDescription("Info on Sdriver1"),

  async execute(interaction, client) {
    const Readme = new ReadmeBuilder()
      .setTitle(`Hello I am Driver 👋`)
      .setDescription(`Here are some facts about me`)
      .setFields([
        {
          name: `Who is Driver`,
          value: `- 17 years old
                  - Male, He/Him 
                  - Pansexual, Omniromantic
                  - Taken 💖 ~ 11/04/23 (13 months)`,
        },
        {
          name: `Languages`,
          value: `- JavaScript (33.59%)
                  - HTML       (23.42%)
                  - Perl       (16.07%)
                  - TypeScript (15.39%)
                  - CSS        (4.62%)
                  - Java       (4.55%)
                  - Python     (2.21%)
                  - Rust       (0.14%)
                  - Shell      (0.01%)`,
        },
        {
          name: `GitHub Stats`,
          value: `- Followers:    5
                  - Total Repos:  12
                  - Stars:        5
                  - Commits:      381`,
        },
        {
          name: `Bot Development`,
          value: `- Pridebot - Verified Discord bot, 2.6k+ servers / 243.9k+ users 
                  - Prisma Bot - Main bot for Prismatic Discord Server (.gg/friendship) / 1.3k+ members
                  - PortalBot - Network/Chat bot for DevEco server and partnering servers (.gg/deveco)`,
        },
        {
          name: `Project`,
          value: `- Center.chat - *coming soon*
                  - DevEco - discord.gg/deveco`,
        },
        {
          name: `Websites`,
          value: `// Pridebot Websites
                  - https://pridebot.xyz - Website for Pridebot
                  - https://pfp.pridebot.xyz - Pridebot PFP API

                  // Personal Websites
                  - https://sdriver1.me - Personal website
                  - https://apcsa.sdriver1.me - Uploads of APCSA work`,
        },
        {
          name: `Socials`,
          value: `- Discord - @sdriver1
                  - Tiktok - @sdriver75
                  - Insta - @sdriver_1`,
        },
      ])
      .setColor("#FF00EA") // Favorite color
      .setThumbnail("https://pfp.pridebot.xyz/691506668781174824/omnisexualpansexual.png")
      .setTimestamp();

    await human.reply({ embeds: [Readme] });
  },
};
```

*This README is updated every day*
  