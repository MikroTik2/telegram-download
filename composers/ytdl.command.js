const { Composer } = require("telegraf");
const { code } = require("telegraf/format");
const ytdl = require("ytdl-core");
const axios = require("axios"); 
const fs = require("fs");

const streamToBuffer = require("../utils/streamBuffer.js");

const textComposer = new Composer();

textComposer.on("text", async (ctx) => {
    const link = ctx.message.text;

    try {
        if (link.includes("tiktok")) {

            const options = {
                method: "GET",
                url: "https://tiktok-downloader-download-tiktok-videos-without-watermark.p.rapidapi.com/vid/index",
                params: {
                    url: link,
                },
                headers: {
                    "X-RapidAPI-Key": "51bdcedcd4msh9242d4a9211e2b3p195cc3jsnac943c9c3eac",
                    "X-RapidAPI-Host": "tiktok-downloader-download-tiktok-videos-without-watermark.p.rapidapi.com",
                },
            };

            await ctx.reply(code(`Сообщение принял. Жду ответа от сервера...`));
            const response = await axios.request(options);

            const video = response.data.video[0] || "Извини Артурбан но видиса нету";
            const author = response.data.author[0] || undefined;
            const description = response.data.description[0] || "В этом видео нету описания";
            const region = response.data.region[0] || "В этом видео не указан регион";

            await ctx.replyWithVideo({ url: video }, { caption: `Автор: ${author}\nОписание: ${description}\nРегион: ${region}` });

        } else if (link.includes("youtube")) {

            await ctx.reply(code(`Сообщение принял. Жду ответа от сервера...`));
            
            const videoInfo = await ytdl.getInfo(link);
            const videoStream = ytdl(link, { filter: "audio", quality: "highestvideo" });

            const videoBuffer = await streamToBuffer(videoStream);
            const filePath = `./video/${videoInfo.videoDetails.title}.mp4`;

            await fs.promises.writeFile(filePath, videoBuffer);

            await ctx.replyWithVideo({ source: filePath });
            await ctx.reply(`Ваше видео: ${videoInfo.videoDetails.title}`);
            
        } else {

            ctx.reply("Не удалось распознать тип видео");

        };
    } catch (error) {
        ctx.reply("Произошла ошибка при попытке скачать видео.");
    };
});

module.exports = textComposer.middleware();