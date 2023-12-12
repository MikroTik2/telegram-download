const { Telegraf, session } = require("telegraf");
const dotenv = require("dotenv").config();

const startComposer = require("./composers/start.command.js");
const ytdlComposer = require("./composers/ytdl.command.js");

console.log(process.env.TEST_ENV);

const bot = new Telegraf(process.env.TOKEN_BOT);

bot.launch()

bot.use(session());

bot.use(startComposer);
bot.use(ytdlComposer);

process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));