const { Composer } = require("telegraf");

const startComposer = new Composer();

startComposer.start(async (ctx) => {
     try {

          ctx.reply(` 
👋 Привет ${ctx.from.first_name} - я могу скачать видео без водяного знака из соц. сетей:

🖤 TikTok
❤️ YouTube
💗 Instagram
🧡 Likee 

Просто отправь мне ссылку на любое видео!
          `)

     } catch (error) {
          console.log(error);
     };
});

startComposer.help(async (ctx) => {
     try {

          ctx.reply(`
Я умею скачивать видео из Instagram, TikTok, Pinterest, Youtube без водяных знаков. 

Как скачать видео:
1. Зайдите в приложение Instagram/TikTok/Pinterest/Youtube
2. Выберите интересное для вас видео 
3. Нажми на кнопку ↪️ или три точки на правом верхнем углу.
4. Нажми кнопку «Скопировать».
5. Отправьте ссылку боту и через пару секунд получите видео без водяного знака.
          `)

     } catch (error) {
          console.log(error);
     };
});

module.exports = startComposer.middleware();