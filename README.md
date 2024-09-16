
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
                  - Taken 💖 ~ 11/04/23 (10 months)`,
        },
        {
          name: `Languages`,
          value: `- JavaScript (43.16%)
                  - HTML       (22.58%)
                  - TypeScript (21.38%)
                  - CSS        (5.99%)
                  - Python     (3.07%)
                  - Java       (2.54%)
                  - Perl       (1.07%)
                  - Rust       (0.19%)
                  - Shell      (0.02%)`,
        },
        {
          name: `GitHub Stats`,
          value: `- Followers:    5
                  - Total Repos:  12
                  - Stars:        4
                  - Commits:      333`,
        },
        {
          name: `Bot Development`,
          value: `- Pridebot - Verified Discord bot, 0 servers / undefined users 
                  - Prisma Bot - Main bot for Prismatic Discord Server (.gg/friendship) / undefined members`,
        },
        {
          name: `Project`,
          value: `- Center.chat - *coming soon*`,
        },
        {
          name: `Websites`,
          value: `- https://pridebot.xyz - Website for Pridebot
                  - https://sdriver1.me - Personal website`,
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
  