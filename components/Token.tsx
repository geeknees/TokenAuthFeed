import { useToken } from "wagmi";

const Token: React.FC<{}> = () => {
  const [{ data, error, loading }, getToken] = useToken({
    // $WETH ERC-20 token only
    address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2"
  });

  // console.log(error);

  if (loading) return <div>Fetching token…</div>;
  if (error) return <div>Error fetching token</div>;
  return (
    <div>
      {data?.totalSupply?.formatted} {data?.symbol}
    </div>
  );
};

export default Token;
