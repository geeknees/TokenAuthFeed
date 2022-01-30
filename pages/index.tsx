import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useAccount, useConnect } from "wagmi";

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

        <p className={styles.description}>
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
                {!x.ready && " (unsupported)"}
              </button>
            ))}

          {error && <div>{error?.message ?? "Failed to connect"}</div>}
        </p>

        <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h2>Documentation &rarr;</h2>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>unknown quality</footer>
    </div>
  );
};

export default Home;
