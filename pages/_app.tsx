import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Provider, chain, defaultL2Chains } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";

const chains = defaultL2Chains;

const connectors = ({ chainId }) => {
  const rpcUrl =
    chains.find((x) => x.id === chainId)?.rpcUrls?.[0] ??
    chain.mainnet.rpcUrls[0];
  return [
    new InjectedConnector({
      chains: chains,
      options: { shimDisconnect: true }
    })
  ];
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider autoConnect connectors={connectors}>
      <Component {...pageProps} />{" "}
    </Provider>
  );
}

export default MyApp;
