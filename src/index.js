require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const { findInitialMessage } = require('./data/firebase.service');
const sheduleMessages = require('./util/shedule-messages');
const { TOKEN } = process.env;

const bot = new TelegramBot(TOKEN, { polling: true });

bot.onText(/\/start/, async (msg) => {
    const chatId = msg.from.id;
    const initialMessage = await findInitialMessage();

    bot.sendMessage(chatId, initialMessage);

    sheduleMessages(bot.sendMessage.bind(bot, chatId));
});