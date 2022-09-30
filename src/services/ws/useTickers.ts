import { last } from "radash";
import { CRYPTO_WS_ENDPOINT } from "@config/endpoint";
import { CRYPTO_WS_API_KEY } from "@config/secrets";

enum CryptoPairId {
  BTCUSDT = "231",
  ETHUSDT = "165",
  SHIBUSDT = "180141",
}

export type CryptoPairName = "BTC/USDT" | "ETH/USDT" | "SHIB/USDT";

type MessageData = {
  authenticationResult?: {
    status: "AUTHENTICATED";
  };
  marketUpdate?: {
    market: {
      marketId: string;
      exchangeId: string;
      currencyPairId: CryptoPairId;
    };
    intervalsUpdate: {
      intervals: Array<any>;
    };
    tradesUpdate?: {
      trades: Array<any>;
    };
  };
};

const getCurrencyPairName = (pairId: CryptoPairId): CryptoPairName => {
  switch (pairId) {
    case CryptoPairId.BTCUSDT:
      return "BTC/USDT";
    case CryptoPairId.ETHUSDT:
      return "ETH/USDT";
    case CryptoPairId.SHIBUSDT:
      return "SHIB/USDT";
  }
};

// Subscribe to binance OHLC
export const SUBSCRIPTION = [
  `instruments:${CryptoPairId.BTCUSDT}:ohlc`,
  `instruments:${CryptoPairId.ETHUSDT}:ohlc`,
  `instruments:${CryptoPairId.SHIBUSDT}:ohlc`,
];

export const TICK_EVENT = "ticker";

// TODO: subscribe all data
// currently it's only subscribe with given arg
const useTickers = () => {
  const ws = new WebSocket(`${CRYPTO_WS_ENDPOINT}?apikey=${CRYPTO_WS_API_KEY}`);

  const subscribe = (connection, resources) => {
    connection.send(
      JSON.stringify({
        subscribe: {
          subscriptions: resources.map((resource) => {
            return { streamSubscription: { resource } };
          }),
        },
      })
    );
  };

  const unsubscribe = (connection, resources) => {
    connection.send(
      JSON.stringify({
        unsubscribe: {
          subscriptions: resources.map((resource) => {
            return { streamSubscription: { resource } };
          }),
        },
      })
    );
  };

  ws.onmessage = async (message: MessageEvent) => {
    const data: MessageData = JSON.parse(await message.data.text());

    if (data?.authenticationResult?.status === "AUTHENTICATED") {
      subscribe(ws, SUBSCRIPTION);
    }

    // Market data comes in a marketUpdate
    // In this case, we're expecting trades so we look for marketUpdate.tradesUpdate
    if (data?.marketUpdate) {
      const { currencyPairId } = data.marketUpdate.market;
      const isInPairList = [
        CryptoPairId.BTCUSDT,
        CryptoPairId.ETHUSDT,
        CryptoPairId.SHIBUSDT,
      ].includes(currencyPairId);

      if (isInPairList) {
        const currencyPairName = getCurrencyPairName(currencyPairId);
        const tickData: object = last(
          data.marketUpdate.intervalsUpdate.intervals
        );
        const tickEvent = new CustomEvent(TICK_EVENT, {
          detail: {
            [currencyPairName]: tickData,
          },
        });
        document.dispatchEvent(tickEvent);
      }
    }
  };
};

export default useTickers;
