import { useBalance } from "wagmi";

export type BalanceProps = {
  address: string;
};

const Balance: React.FC<BalanceProps> = (balance) => {
  const [{ data, error, loading }, getBalance] = useBalance({
    addressOrName: balance.address
  });

  //console.log(data);

  if (loading) return <div>Fetching balance…</div>;
  if (error) return <div>Error fetching balance</div>;
  return (
    <div>
      {data?.formatted} {data?.symbol}
    </div>
  );
};

export default Balance;
