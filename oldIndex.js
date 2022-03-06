const schedule = require("node-schedule");
const TelegramBot = require("node-telegram-bot-api");
const getPrices = require("./coinGeckoPrices.js");

const chatIds = [
  1593738553, // personalId
  // -713262754, // groupId
];
const token = "5113868658:AAHtr5rewcrg0f7ERTw7tLc7KmDL5xig2cI";
const limits = [0.02, 0.08];

const bot = new TelegramBot(token, { polling: true });

const sendToAll = (msg) => {
  chatIds.forEach((cId) => {
    bot.sendMessage(cId, msg);
  });
};

bot.onText(/\/status/, async (msg, match) => {
  const chatId = msg.chat.id;
  const prices = await getPrices();
  bot.sendMessage(chatId, prices.text);
});

const job = schedule.scheduleJob("0 * * * * *", async () => {
  const prices = await getPrices();
  if (prices.spread < limits[0] || prices.spread > limits[1]) {
    sendToAll(prices.text);
  }
});
