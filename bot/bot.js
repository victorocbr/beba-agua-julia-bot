const TelegramBot = require('node-telegram-bot-api');
const { findInitialMessage } = require('./data/firebase.service');
const sheduleMessages = require('./util/shedule-messages');
const token = process.env.TOKEN;

let bot;

if (process.env.NODE_ENV === 'production') {
    bot = new TelegramBot(token);
    bot.setWebHook(process.env.HEROKU_URL + bot.token);
}
else {
    bot = new TelegramBot(token, { polling: true });
}

console.log(`Bot server started in the ${process.env.NODE_ENV} mode`);

bot.onText(/\/start/, async (msg) => {
    const chatId = msg.from.id;
    const initialMessage = await findInitialMessage();

    bot.sendMessage(chatId, initialMessage);

    sheduleMessages(bot.sendMessage.bind(bot, chatId));
});

module.exports = bot;