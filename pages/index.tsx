import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useAccount, useConnect } from "wagmi";

import Network from "../components/Network";
import Balance from "../components/Balance";
import Henkaku from "../components/Henkaku";

const Home: NextPage = (props) => {
  const [{ data, error }, connect] = useConnect();
  const [{ data: accountData }, disconnect] = useAccount();

  return (
    <div className={styles.container}>
      <Head>
        <title>Token Auth Feed</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Token Auth Feed</h1>

        <div className={styles.description}>
          {accountData && (
            <div>
              <div>Your account: {accountData.address}</div>
              <div>Connected to {accountData?.connector?.name}</div>
              <button onClick={disconnect}>Disconnect</button>
            </div>
          )}
          {!accountData &&
            data.connectors.map((x) => (
              <button key={x.id} onClick={() => connect(x)}>
                Connect Wallet
              </button>
            ))}

          {error && <div>{error?.message ?? "Failed to connect"}</div>}
        </div>

        <div>
          <div className={styles.card}>
            <h4>Balance(Henkaku)</h4>
            {accountData && <Henkaku address={accountData.address} />}
          </div>
        </div>

        <div className={styles.grid}>
          <div className={styles.card}>
            <h4>Network</h4>
            <Network />
          </div>

          <div className={styles.card}>
            <h4>Balance(Mainnet)</h4>
            {accountData && <Balance address={accountData.address} />}
          </div>
        </div>
      </main>

      <footer className={styles.footer}>unknown quality</footer>
    </div>
  );
};

export default Home;
