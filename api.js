const axios = require("axios").default;

async function getGate() {
  try {
    const {
      data: { bids, asks },
    } = await axios.get(
      "https://api.gateio.ws/api/v4/spot/order_book?currency_pair=OMI_USDT&limit=50"
    );
    return { bids, asks };
  } catch (error) {
    console.error(error);
  }
}

async function getAscendex() {
  try {
    const {
      data: {
        data: {
          data: { bids, asks },
        },
      },
    } = await axios.get(
      "https://ascendex.com/api/pro/v1/depth?symbol=OMI%2FUSDT"
    );
    return { bids, asks };
  } catch (error) {
    console.error(error);
  }
}
module.exports = { getGate, getAscendex };
