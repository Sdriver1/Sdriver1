```javascript
const { ReadmeBuilder, ReadmeContentBuilder } = require("Github.js")

module.exports = {
  data: new ReadmeContentBuilder()
    .setName("driver")
    .setDescription("Info on Sdriver1"),

  async execute(interaction, client) {
    const Readme = new ReadmeBuilder()
      .setTitle(`Hello I am Driver 👋`)
      .setDescription(
        `Here are some facts about me`
      )
      .setFields(
        [
          {
            name: `Who is Driver`,
            value: `16 years | Male, He/Him | Pansexual, Omniromantic | NY, USA `,
          },
          {
            name: `Languages`,
            value: `Javascript | HTML & CSS | Learning: Python and SQL`,
          },
          {
            name: `Projects`,
            value: `Pridebot - Verified Discord bot, 310+ servers \nPridebot.xyz - Website for Pridebot`,
          },
          {
            name: `Socials`,
            value: `Discord - @sdriver1, Tiktok - @sdriver75, Insta - @sdriver_1, X - @Sdriver110`,
          }
        ]
      );
      .setColor("#FF00EA")
      .setThumbnail("https://cdn.discordapp.com/avatars/691506668781174824/87d37bb9de7440f4f47456be7b262664.png")
      .setTimestamp();

    await human.reply({ embeds: [Readme] });
  },
};
```

## My Stats
![](https://github-readme-stats.vercel.app/api?username=Sdriver1&show_icons=true&theme=dark)
