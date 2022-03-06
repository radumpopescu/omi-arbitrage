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
   $100: Asc->Gate: -4.34% || Gate-Asc: 3.49%
   $500: Asc->Gate: -4.39% || Gate-Asc: 3.39%
  $1000: Asc->Gate: -4.41% || Gate-Asc: 3.25%
  $5000: Asc->Gate: -5.32% || Gate-Asc: 1.88%
 $10000: Asc->Gate: -5.68% || Gate-Asc: 1.42%
 $20000: Asc->Gate: -6.09% || Gate-Asc: -0.0183%
 $50000: Not enough Volume
$100000: Not enough Volume
```
