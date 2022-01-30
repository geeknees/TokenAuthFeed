import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useAccount, useConnect } from "wagmi";

import Network from "./components/Network";

const Home: NextPage = () => {
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
              <div>Connected to {accountData.connector.name}</div>
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

        <div className={styles.grid}>
          <Network />
        </div>
      </main>

      <footer className={styles.footer}>unknown quality</footer>
    </div>
  );
};

export default Home;
