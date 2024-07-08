
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
                  - NY, USA 
                  - Taken 💖 ~ 11/04/24`,
        },
        {
          name: `Languages`,
          value: `- JavaScript (48.34%)
                  - TypeScript (28.48%)
                  - HTML       (14.90%)
                  - CSS        (3.49%)
                  - Java       (2.47%)
                  - Python     (2.04%)
                  - Rust       (0.25%)
                  - Shell      (0.02%)`,
        },
        {
          name: `GitHub Stats`,
          value: `- Followers:    4
                  - Total Repos:  8
                  - Stars:        4
                  - Commits:      290`,
        },
        {
          name: `Bot Development`,
          value: `- Pridebot - Verified Discord bot, 747 servers 
                  - Prisma Bot - Main bot for Prismatic Discord Server (.gg/friendship)`,
        },
        {
          name: `Websites`,
          value: `- https://pridebot.xyz - Website for Pridebot
                  - https://sdriver1.me - Personal website`,
        },
        {
          name: `Servers`,
          value: ` *coming soon* `,
        },
        {
          name: `Socials`,
          value: `- Discord - @sdriver1
                  - Tiktok - @sdriver75
                  - Insta - @sdriver_1
                  - X/Twitter - @Sdriver110`,
        },
      ])
      .setColor("#FF00EA") // Favorite color
      .setThumbnail("https://sdriver1.me/profile.png")
      .setTimestamp();

    await human.reply({ embeds: [Readme] });
  },
};
```
  