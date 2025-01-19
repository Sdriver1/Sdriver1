
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
                  - Taken 💖 ~ 11/04/23 (14 months)`,
        },
        {
          name: `Languages`,
          value: `- JavaScript (36.09%)
                  - TypeScript (22.42%)
                  - Perl       (16.44%)
                  - HTML       (15.20%)
                  - Java       (4.65%)
                  - CSS        (2.80%)
                  - Python     (2.26%)
                  - Rust       (0.14%)
                  - Shell      (0.01%)`,
        },
        {
          name: `GitHub Stats`,
          value: `- Followers:    5
                  - Total Repos:  13
                  - Stars:        6
                  - Commits:      371`,
        },
        {
          name: `Bot Development`,
          value: ` // JavaScript
                  - Pridebot - Your Discord bot to LGBTQ Identities 2.8k+ servers / 257.8k+ users 
                  - PortalBot - Network/Chat bot for DevEco server and partnering servers (.gg/deveco)
                  - AntiForward - Discord bot designed to keep forwarded messages out of your server
                  
                  // TypeScript
                  - Prisma Bot - Main bot for Prismatic Discord Server (.gg/friendship) / 1.3k+ members
                  - Economy Bot - Economy/Shop bot designed for Obby Street (.gg/xxs) / 4.2k+ members`,
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
                  - https://pfp.pridebot.xyz - Pridebot PFP

                  // Personal Websites
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
  