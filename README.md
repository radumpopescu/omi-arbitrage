## OMI Arbitrage Telegram notifier

Because right now OMI deposits/withdrawals are not enabled on Gate.io exchange, there are many arbitrage opportunities when price is sometimes similar between Gate.io and Ascendex and other times very much diverged (<1% vs >8%)

This Telegram bot sends a message when such opportunity appears

An `.env` file is required that needs to contain:

```
TELEGRAM_TOKEN # self explanatory
CHAT_IDS # a list of chat ids to send the automatic notifications, i.e.: 23,42,-84
```

Current result can be also manually invoked by sending the `/status` command to the bot
Example response:

```
   $100: Asc->Gate: -4.42% || Gate-Asc: 4.05%
   $500: Asc->Gate: -4.74% || Gate-Asc: 3.92%
  $1000: Asc->Gate: -5.11% || Gate-Asc: 3.66%
  $5000: Asc->Gate: -5.73% || Gate-Asc: 2.09%
 $10000: Asc->Gate: -6.06% || Gate-Asc: 1.53%
 $25000: Asc->Gate: -6.80% || Gate-Asc: -0.497%
```
