```javascript
const { ReadmeBuilder, ReadmeContentBuilder } = require("Github.js")

module.exports = {
  data: new ReadmeContentBuilder()
    .setName("whoisdriver")
    .setDescription("Info on Sdriver1"),

  async execute(interaction, client) {
    const Readme = new ReadmeBuilder()
      .setTitle(`Hello I am Driver 👋`)
      .setDescription(`Here are some facts about me`)
      .setFields(
        [
          {
            name: `Who is Driver`,
            value: `16 years | Male, He/Him | Pansexual, Omniromantic | NY, USA | Taken 💖`,
          },
          {
            name: `Languages`,
            value: `Javascript | HTML & CSS | Learning: Python and Java`,
          },
          {
            name: `Projects`,
            value: `Pridebot - Verified Discord bot, 520+ servers \n Pridebot.xyz - Website for Pridebot`,
          },
          {
            name: `Socials`,
            value: `Discord - @sdriver1, Tiktok - @sdriver75, Insta - @sdriver_1, X - @Sdriver110`,
          }
        ]
      );
      .setColor("#FF00EA") // Favorite color
      .setThumbnail("https://cdn.discordapp.com/avatars/691506668781174824/87d37bb9de7440f4f47456be7b262664.png")
      .setTimestamp();

    await human.reply({ embeds: [Readme] });
  },
};
```


<a href="https://github.com/sdriver1">
  <img height=180 align="center" src="https://github-readme-stats.vercel.app/api?username=Sdriver1&show_icons=true&theme=dark" />
</a>
<a href="https://github.com/sdriver1">
  <img height=180 align="center" src="https://github-readme-stats.vercel.app/api/top-langs/?username=Sdriver1&layout=compact" />
</a>
