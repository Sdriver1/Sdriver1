
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
                  - Taken 💖 ~ 11/04/23 (17 months)
                  - Software Developer Intern @ devEco Consulting`,
        },
        {
          name: `Languages`,
          value: `- JavaScript (35.83%)
                  - HTML       (26.37%)
                  - TypeScript (16.26%)
                  - Perl       (11.92%)
                  - Java       (4.20%)
                  - CSS        (3.11%)
                  - Python     (2.16%)
                  - Rust       (0.10%)
                  - Shell      (0.06%)`,
        },
        {
          name: `GitHub Stats`,
          value: `- Followers:    7
                  - Total Repos:  23
                  - Stars:        7
                  - Commits:      764`,
        },
        {
          name: `Bot Development`,
          value: ` // JavaScript
                  - Pridebot - Your Discord bot to LGBTQ Identities | 4.0k+ servers / 318.3k+ users
                  - Pridebot Manager - A utility bot for Pridebot Support Server
                  - PortalBot - Network/Chat bot for PortalBot network | 26 servers / 16.2k+ users
                  - AntiForward - Discord bot designed to keep forwarded messages out of your server (Offline)
                  
                  // TypeScript
                  - Prisma Bot - Main bot for Prismatic Discord Server (.gg/friendship) / 1.3k+ members
                  - Economy Bot - Economy/Shop bot designed for Obby Street (.gg/xxs) / 6.3k+ members (Offline)`,
        },
        {
          name: `Project`,
          value: `- Center.chat - *coming soon*
                  - DevEco - discord.gg/deveco`,
        },
        {
          name: `Websites`,
          value: `// Personal Websites
                  - https://sdriver1.me
                  - https://stevendriver.com
                  
                  // Bot Websites
                  - https://pridebot.xyz - Pridebot
                  - https://portalnet.work - PortalBot
                  
                  // Fun Websites
                  - https://youarenow.gay - Turn you and your friends gay | 856 visits / 391 "ungay" clicks
                  - https://sdriver1.me/calculator - Small graphing calculator with easy to use UI

                  // Help Contributed too
                  - https://youdeservetolive.org - Mental health site made by teens for teens. In honor of Joshua Blackledge
                  `,
        },
        {
          name: `Socials`,
          value: `- Discord - @sdriver1
                  - Tiktok - @sdriver75
                  - Insta - @sdriver_1
                  - Linkedin - https://sdriver1.me/linkedin`,
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
  