const { Telegraf, Markup } = require("telegraf");
const fs = require("fs");
const dotenv = require("dotenv");
const request = require("request");

dotenv.config();
const token = process.env.BOT_TOKEN;
if (token === undefined) {
  throw new Error("BOT_TOKEN must be provided!");
}

const AnimationUrl1 = "https://media.giphy.com/media/ya4eevXU490Iw/giphy.gif";
const AnimationUrl2 = "https://media.giphy.com/media/LrmU6jXIjwziE/giphy.gif";

const bot = new Telegraf(token);

bot.command("getty_images", (ctx) => {
  request.get(
    "https://6v0luvcal3.execute-api.us-west-2.amazonaws.com/prod/backgroundimagecached",
    (err, response) => {
      if (err) throw err;
      const { body } = response;
      const parsedBody = JSON.parse(body);
      const image_url = parsedBody.high_res_comp;
      ctx.replyWithPhoto({ url: image_url });
    }
  );
});
bot.command("shutterstock", (ctx) => {
  request.get("http://tab.shutterstock.com/photos", (err, response) => {
    if (err) throw err;
    const { body } = response;
    const parsedBody = JSON.parse(body);
    const image_url = parsedBody.image_url;
    ctx.replyWithPhoto({ url: image_url });
  });
});
bot.command("random", (ctx) =>
  ctx.replyWithPhoto({ url: "http://source.unsplash.com/random/random" })
);
bot.command("pipe", (ctx) =>
  ctx.replyWithPhoto({ url: "http://source.unsplash.com/random/random" })
);
bot.command("url", (ctx) =>
  ctx.replyWithPhoto("https://picsum.photos/200/300/?random")
);
bot.command("animation", (ctx) => ctx.replyWithAnimation(AnimationUrl1));

bot.launch();

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
