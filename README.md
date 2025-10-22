
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
          value: `- JavaScript (45.73%)
                  - HTML       (26.50%)
                  - TypeScript (9.28%)
                  - Perl       (6.80%)
                  - CSS        (5.75%)
                  - Java       (4.26%)
                  - Python     (1.58%)
                  - Rust       (0.06%)
                  - Shell      (0.03%)`,
        },
        {
          name: `GitHub Stats`,
          value: `- Followers:    15
                  - Total Repos:  28
                  - Stars:        14
                  - Commits:      934`,
        },
        {
          name: `Bot Development`,
          value: `
                  - Pridebot - Your Discord bot to LGBTQ Identities | 9.3k+ servers / 734.5k+ users
                  - Pridebot Manager - A utility bot for Pridebot Support Server
                  - PortalBot - Network/Chat bot for PortalBot network | 36 servers / 80.9k+ users
                  - AntiForward - Discord bot designed to keep forwarded messages out of your server (Offline)`,
        },
        {
          name: `MC Project`,
          value: `- Pingbriel - Custom minecraft plugin for [Pridecord](https://discord.gg/lgbtqia)
                  - PridebotMC - Custom minecraft plugin for Fabric 1.21+ with favorite pridebot features`,
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
                  - https://youarenow.gay - Turn you and your friends gay | 0 visits / 0 "ungay" clicks

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
      .setThumbnail("https://images.sdriver1.me/profile.png")
      .setTimestamp();

    await human.reply({ embeds: [Readme] });
  },
};
```

*This README is updated every day*
  