
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
          value: `- 16 years 
                  - Male, He/Him 
                  - Pansexual, Omniromantic
                  - Taken 💖 ~ 11/04/23`,
        },
        {
          name: `Languages`,
          value: `- JavaScript (48.43%)
                  - TypeScript (27.45%)
                  - HTML       (15.53%)
                  - CSS        (3.36%)
                  - Python     (2.57%)
                  - Java       (2.38%)
                  - Rust       (0.24%)
                  - Shell      (0.02%)`,
        },
        {
          name: `GitHub Stats`,
          value: `- Followers:    5
                  - Total Repos:  9
                  - Stars:        4
                  - Commits:      275`,
        },
        {
          name: `Bot Development`,
          value: `- Pridebot - Verified Discord bot, 790 servers 
                  - Prisma Bot - Main bot for Prismatic Discord Server (.gg/friendship)`,
        },
        {
          name: `Websites`,
          value: `- https://pridebot.xyz - Website for Pridebot
                  - https://sdriver1.me - Personal website`,
        },
        {
          name: `Servers`,
          value: `- Pridetopia - *coming soon*`,
        },
        {
          name: `Socials`,
          value: `- Discord - @sdriver1
                  - Tiktok - @sdriver75
                  - Insta - @sdriver_1`,
        },
      ])
      .setColor("#FF00EA") // Favorite color
      .setThumbnail("https://sdriver1.me/profile.png")
      .setTimestamp();

    await human.reply({ embeds: [Readme] });
  },
};
```

*This README is updated every day*
  