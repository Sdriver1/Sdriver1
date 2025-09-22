
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
          value: `- JavaScript (44.52%)
                  - HTML       (27.38%)
                  - TypeScript (9.59%)
                  - Perl       (7.03%)
                  - CSS        (5.34%)
                  - Java       (4.41%)
                  - Python     (1.63%)
                  - Rust       (0.06%)
                  - Shell      (0.03%)`,
        },
        {
          name: `GitHub Stats`,
          value: `- Followers:    13
                  - Total Repos:  27
                  - Stars:        12
                  - Commits:      930`,
        },
        {
          name: `Bot Development`,
          value: `
                  - Pridebot - Your Discord bot to LGBTQ Identities | 8.6k+ servers / 706.2k+ users
                  - Pridebot Manager - A utility bot for Pridebot Support Server
                  - PortalBot - Network/Chat bot for PortalBot network | 36 servers / 79.5k+ users
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
                  - https://youarenow.gay - Turn you and your friends gay | 1.4k+ visits / 6.0k+ "ungay" clicks

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
  