
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
          value: `- JavaScript (45.79%)
                  - TypeScript (22.45%)
                  - HTML       (19.96%)
                  - CSS        (5.29%)
                  - Python     (3.22%)
                  - Java       (1.95%)
                  - Perl       (1.12%)
                  - Rust       (0.20%)
                  - Shell      (0.02%)`,
        },
        {
          name: `GitHub Stats`,
          value: `- Followers:    5
                  - Total Repos:  11
                  - Stars:        4
                  - Commits:      314`,
        },
        {
          name: `Bot Development`,
          value: `- Pridebot - Verified Discord bot, 991 servers / 157.2k+ users 
                  - Prisma Bot - Main bot for Prismatic Discord Server (.gg/friendship) / 1.4k+ members`,
        },
        {
          name: `Websites`,
          value: `- https://pridebot.xyz - Website for Pridebot
                  - https://sdriver1.me - Personal website`,
        },
        {
          name: `Servers`,
          value: `- Corecord Gardens - *coming soon*`,
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
  