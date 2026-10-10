
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
          value: `- 19 years old
                  - Male, He/Him 
                  - Founder @ Pridebot Systems
                  - Software Developer Intern @ devEco Consulting`,
        },
        {
          name: `Languages`,
          value: `- JavaScript (55.19%)
                  - HTML       (22.01%)
                  - TypeScript (7.77%)
                  - CSS        (6.96%)
                  - Perl       (4.36%)
                  - Java       (2.38%)
                  - Python     (1.22%)
                  - Rust       (0.04%)
                  - Nix        (0.03%)
                  - Shell      (0.02%)
                  - Dockerfile (0.01%)`,
        },
        {
          name: `GitHub Stats`,
          value: `- Followers:    28
                  - Total Repos:  35
                  - Stars:        32
                  - Commits:      1197`,
        },
        {
          name: `Bot Development`,
          value: `// Bots I have developed
                  - Pridebot - Your Discord bot to LGBTQ Identities | 18.8k+ servers / 1.3M+ users
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
  