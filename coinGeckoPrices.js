const Big = require("big.js");
const { DateTime } = require("luxon");
const CoinGecko = require("coingecko-api");
const CoinGeckoClient = new CoinGecko();

const toPercentage = (val) => {
  return `${Big(val * 100).toPrecision(3)}%`;
};

const getPrice = async (exc) => {
  let { data } = await CoinGeckoClient.exchanges.fetchTickers(exc, {
    coin_ids: "ecomi",
  });
  let value = data.tickers.find(
    ({ target_coin_id }) => target_coin_id == "tether"
  );
  return {
    price: value.converted_last.usd,
    spread: value.bid_ask_spread_percentage,
  };
};

const getPrices = async () => {
  const gate = await getPrice("gate");
  const ascendex = await getPrice("bitmax");

  let text = `Spread is ${toPercentage(gate.price / ascendex.price - 1)}\n`;
  text += `Gate.io: ${gate.price} (spread ${toPercentage(
    gate.spread / 100
  )})\n`;
  text += `Ascendex: ${ascendex.price} (spread ${toPercentage(
    ascendex.spread / 100
  )})\n`;
  return { gate, ascendex, text, spread: gate.price / ascendex.price - 1 };
};

module.exports = getPrices;
