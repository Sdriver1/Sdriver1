
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
                  - Founder @ Pridebot Systems
                  - Software Developer Intern @ devEco Consulting`,
        },
        {
          name: `Languages`,
          value: `- JavaScript (48.89%)
                  - HTML       (25.21%)
                  - TypeScript (8.91%)
                  - CSS        (7.74%)
                  - Perl       (5.00%)
                  - Java       (2.73%)
                  - Python     (1.40%)
                  - Rust       (0.04%)
                  - Nix        (0.04%)
                  - Shell      (0.03%)`,
        },
        {
          name: `GitHub Stats`,
          value: `- Followers:    26
                  - Total Repos:  35
                  - Stars:        32
                  - Commits:      1121`,
        },
        {
          name: `Bot Development`,
          value: `// Bots I have developed
                  - Pridebot - Your Discord bot to LGBTQ Identities | 16.9k+ servers / 1.2M+ users
                  - Pridebot Manager - A utility bot for Pridebot Support Server
                  - PridebotOSM - Fork of Pridebot for [Osmium](https://osmium.chat/)
                  - AdvancedCounter - An advanced counting bot supporting multiple counting modes and input validation

                  // Bots I have contributed to
                  - PortalBot - Network/Chat bot for PortalBot network`,
        },
        {
          name: `Minecraft Projects`,
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
          name: `Other Projects`,
          value: `// Google Extensions
                  - NY Times Spelling Bee Solver - A tool to help solve the NY Times Spelling Bee puzzle`,
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
  