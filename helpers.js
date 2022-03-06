const Big = require("big.js");

const toPercentage = (val) => {
  return `${Big(val).toPrecision(3)}%`;
};

function getFirstDiff({ gate, ascendex }) {
  return {
    ascGate: {
      ascendex: ascendex.bids[0],
      gate: gate.asks[0],
      percentage: (gate.asks[0][0] / ascendex.bids[0][0] - 1) * 100,
      volume: Math.min(
        gate.asks[0][0] * gate.asks[0][1],
        ascendex.bids[0][0] * ascendex.bids[0][1]
      ),
    },
    gateAsc: {
      ascendex: ascendex.asks[0],
      gate: gate.bids[0],
      percentage: (gate.bids[0][0] / ascendex.asks[0][0] - 1) * 100,
      volume: Math.min(
        gate.bids[0][0] * gate.bids[0][1],
        ascendex.asks[0][0] * ascendex.asks[0][1]
      ),
    },
  };
}

function getVolumePrice(data, volume, bidSide = true) {
  // TODO Maybe volume should be OMI on the return side
  let currentVolume = 0;
  let currentPrice = 0;
  index = -1;
  while (currentVolume < volume && index < data.length - 1) {
    index++;
    const p = parseFloat(data[index][0]);
    const v = parseFloat(data[index][1]);
    const vol = bidSide ? p * v : v;
    if (volume - currentVolume > vol) {
      currentVolume += vol;
      currentPrice += bidSide ? v : p * v;
    } else {
      currentPrice += bidSide
        ? (volume - currentVolume) / p
        : (volume - currentVolume) * p;
      currentVolume = volume;
    }
    // console.log({ p, v, currentVolume, vol, currentPrice });
  }
  if (currentVolume == volume) {
    return { volume, price: currentPrice, maxPrice: data[index][0] };
  }
  return {};
}

function getResults({ gate, ascendex, volumes }) {
  const results = volumes.map((volume) => {
    // Asc -> Gate
    const ascBid = getVolumePrice(ascendex.bids, volume);
    const gateAsk = getVolumePrice(gate.asks, ascBid.price, false);
    const ascGate = {
      ascBid,
      gateAsk,
      percentage: (ascBid.volume / gateAsk.price - 1) * 100,
    };
    // Gate -> Asc
    const gateBid = getVolumePrice(gate.bids, volume);
    const ascAsk = getVolumePrice(ascendex.asks, gateBid.price, false);
    const gateAsc = {
      gateBid,
      ascAsk,
      percentage: (gateBid.volume / ascAsk.price - 1) * 100,
    };
    return { volume, ascGate, gateAsc };
  });
  // console.log(JSON.stringify(results, null, 2));

  let stringResults = results.map(
    ({ volume, ascGate: { percentage: p1 }, gateAsc: { percentage: p2 } }) => {
      if (isNaN(p1) || isNaN(p1)) {
        return `${`$${volume}`.padStart(7, " ")}: Not enough Volume`;
      }
      return `${`$${volume}`.padStart(7, " ")}: Asc->Gate: ${`${toPercentage(
        p1
      )}`.padStart(6, " ")} || Gate-Asc: ${toPercentage(p2)}`;
    }
  );
  return stringResults.join("\n");
}

module.exports = { toPercentage, getFirstDiff, getVolumePrice, getResults };
