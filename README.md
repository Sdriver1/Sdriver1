
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
          value: `- JavaScript (47.25%)
                  - HTML       (26.18%)
                  - TypeScript (8.88%)
                  - CSS        (6.14%)
                  - Perl       (5.99%)
                  - Java       (3.75%)
                  - Python     (1.68%)
                  - Rust       (0.05%)
                  - Nix        (0.04%)
                  - Shell      (0.03%)`,
        },
        {
          name: `GitHub Stats`,
          value: `- Followers:    18
                  - Total Repos:  32
                  - Stars:        22
                  - Commits:      1050`,
        },
        {
          name: `Bot Development`,
          value: `
                  - Pridebot - Your Discord bot to LGBTQ Identities | 12.5k+ servers / 905.7k+ users
                  - Pridebot Manager - A utility bot for Pridebot Support Server
                  - AdvancedCounter - An advanced counting bot supporting multiple counting modes and input validation
                  - PortalBot - Network/Chat bot for PortalBot network | 43 servers / 100.8k+ users
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
                  - https://youarenow.gay - Turn you and your friends gay

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
  