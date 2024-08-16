
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
          value: `- JavaScript (44.78%)
                  - TypeScript (22.87%)
                  - HTML       (20.33%)
                  - CSS        (5.38%)
                  - Python     (3.28%)
                  - Java       (1.99%)
                  - Perl       (1.15%)
                  - Rust       (0.20%)
                  - Shell      (0.02%)`,
        },
        {
          name: `GitHub Stats`,
          value: `- Followers:    5
                  - Total Repos:  11
                  - Stars:        4
                  - Commits:      305`,
        },
        {
          name: `Bot Development`,
          value: `- Pridebot - Verified Discord bot, 945 servers / 152.0k+ users 
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
  