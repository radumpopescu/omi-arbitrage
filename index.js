const schedule = require("node-schedule");
const TelegramBot = require("node-telegram-bot-api");
require("dotenv").config();

const { getGate, getAscendex } = require("./api.js");
const { getFirstDiff, getResults } = require("./helpers.js");

const volumes = [100, 500, 1000, 5000, 10000, 20000, 50000, 100000];
const limits = [2, 8];

const chatIds = process.env.CHAT_IDS.split(",");
const token = process.env.TELEGRAM_TOKEN;

const bot = new TelegramBot(token, { polling: true });

const sendToAll = (msg, options = {}) => {
  chatIds.forEach((cId) => {
    bot.sendMessage(cId, msg, options);
  });
};

bot.onText(/\/status/, async (msg, match) => {
  const chatId = msg.chat.id;
  const gate = await getGate();
  const ascendex = await getAscendex();
  let text = getResults({ gate, ascendex, volumes });
  bot.sendMessage(chatId, `\`\`\`${text}\`\`\``, { parse_mode: "Markdown" });
});

const job = schedule.scheduleJob("0 * * * * *", async () => {
  const gate = await getGate();
  const ascendex = await getAscendex();

  const {
    ascGate: { percentage: p1 },
    gateAsc: { percentage: p2 },
  } = getFirstDiff({ gate, ascendex });

  if (p1 < limits[0] || p2 > limits[1]) {
    let text = getResults({ gate, ascendex, volumes });
    sendToAll(`\`\`\`${text}\`\`\``, { parse_mode: "Markdown" });
  }
});
