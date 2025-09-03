
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
          value: `- 18 years old
                  - Male, He/Him 
                  - Pansexual, Omniromantic
                  - Software Developer Intern @ devEco Consulting`,
        },
        {
          name: `Languages`,
          value: `- JavaScript (41.94%)
                  - HTML       (30.22%)
                  - TypeScript (9.78%)
                  - Perl       (7.17%)
                  - CSS        (4.61%)
                  - Java       (4.49%)
                  - Python     (1.70%)
                  - Rust       (0.06%)
                  - Shell      (0.04%)`,
        },
        {
          name: `GitHub Stats`,
          value: `- Followers:    12
                  - Total Repos:  27
                  - Stars:        12
                  - Commits:      905`,
        },
        {
          name: `Bot Development`,
          value: ` // JavaScript
                  - Pridebot - Your Discord bot to LGBTQ Identities | 8.1k+ servers / 690.2k+ users
                  - Pridebot Manager - A utility bot for Pridebot Support Server
                  - PortalBot - Network/Chat bot for PortalBot network | 34 servers / 78.9k+ users
                  - AntiForward - Discord bot designed to keep forwarded messages out of your server (Offline)
                  
                  // TypeScript
                  - Prisma Bot - Main bot for Prismatic Discord Server (.gg/friendship) / 346 members
                  - Economy Bot - Economy/Shop bot designed for Obby Street (.gg/xxs) / 0 members (Offline)`,
        },
        {
          name: `Project`,
          value: `- Center.chat - *coming soon*
                  - DevEco - discord.gg/deveco
                  - Pingbriel - Custom minecraft plugin for [Pridecord](https://discord.gg/lgbtqia)`,
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
                  - https://youarenow.gay - Turn you and your friends gay | 1.4k+ visits / 5.9k+ "ungay" clicks

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
  