import useSWR from "swr";
import styles from "../styles/Home.module.css";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export type HenkakuProps = {
  address: string;
};

const Henkaku: React.FC<HenkakuProps> = (henkaku) => {
  const APIKEY = process.env.NEXT_PUBLIC_POLYGONSCAN_API_KEY as string;
  const HENKAKU_CONTRACT = "0xd59FFEE93A55F67CeD0F56fa4A991d4c8c8f5C4E";
  const ADDRESS = henkaku.address;
  const ENDPOINT = `https://api.polygonscan.com/api?module=account&action=tokenbalance&contractaddress=${HENKAKU_CONTRACT}&address=${ADDRESS}&tag=latest&apikey=${APIKEY}`;

  const { data, error } = useSWR(ENDPOINT, fetcher);

  if (error) return "An error has occurred.";
  if (!data) return "Loading...";

  // console.log(data);

  const token_count = data.result / 1000000000000000000;
  return (
    <div>
      <strong>✨ {token_count} HENKAKU ✨</strong>
      <p>
        {token_count > 99 ? (
          <span className={styles.feed}>
            🎉 🎉 🎉 <a href="https://pitpa.jp/rss/joiito">PODCAST FEED</a> 🎉
            🎉 🎉{" "}
          </span>
        ) : (
          <span>🙇🙇🙇　Need more than 100 HENKAKU 🙇🙇🙇</span>
        )}
      </p>
    </div>
  );
};

export default Henkaku;
