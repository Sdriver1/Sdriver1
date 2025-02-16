
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
                  - Taken 💖 ~ 11/04/23 (15 months)
                  - Software Developer Intern @ devEco Consulting`,
        },
        {
          name: `Languages`,
          value: `- JavaScript (37.07%)
                  - TypeScript (22.88%)
                  - Perl       (16.78%)
                  - HTML       (14.91%)
                  - Java       (3.50%)
                  - CSS        (2.40%)
                  - Python     (2.30%)
                  - Rust       (0.14%)
                  - Shell      (0.01%)`,
        },
        {
          name: `GitHub Stats`,
          value: `- Followers:    6
                  - Total Repos:  13
                  - Stars:        6
                  - Commits:      375`,
        },
        {
          name: `Bot Development`,
          value: ` // JavaScript
                  - Pridebot - Your Discord bot to LGBTQ Identities | 3.2k+ servers / 276.6k+ users 
                  - PortalBot - Network/Chat bot for PortalBot network | 14 servers / 11.0k+ users
                  - AntiForward - Discord bot designed to keep forwarded messages out of your server
                  
                  // TypeScript
                  - Prisma Bot - Main bot for Prismatic Discord Server (.gg/friendship) / 1.3k+ members
                  - Economy Bot - Economy/Shop bot designed for Obby Street (.gg/xxs) / 5.0k+ members`,
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
                  - https://youarenow.gay - Turn you and your friends gay | 691 visits / 298 "ungay" clicks
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
  