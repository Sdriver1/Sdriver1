
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
          value: ``,
        },
        {
          name: `GitHub Stats`,
          value: `- Followers:    0
                  - Total Repos:  0
                  - Stars:        0
                  - Commits:      0`,
        },
        {
          name: `Bot Development`,
          value: `- Pridebot - Verified Discord bot, 2.5k+ servers / 228.6k+ users 
                  - Prisma Bot - Main bot for Prismatic Discord Server (.gg/friendship) / 1.3k+ members`,
        },
        {
          name: `Project`,
          value: `- Center.chat - *coming soon*`,
        },
        {
          name: `Websites`,
          value: `//Pridebot Websites
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
  