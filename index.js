const { Telegraf, session } = require("telegraf");
const dotenv = require("dotenv").config();

const port = process.env.PORT || 3000;

const startComposer = require("./composers/start.command.js");
const ytdlComposer = require("./composers/ytdl.command.js");

const bot = new Telegraf(process.env.TOKEN_BOT);

bot.launch({ webhook: { domain: 'https://telegram-download.vercel.app/', port } })

bot.use(session());

bot.use(startComposer);
bot.use(ytdlComposer);

process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));