import { useToken } from "wagmi";

const Token: React.FC<{}> = () => {
  const [{ data, error, loading }, getToken] = useToken({
    // $UNI ERC-20 token only
    address: "0x6144d927ee371de7e7f8221b596f3432e7a8e6d9"
  });

  // console.log(data);

  if (loading) return <div>Fetching token…</div>;
  if (error) return <div>Error fetching token</div>;
  return (
    <div>
      {data?.totalSupply?.formatted} {data?.symbol}
    </div>
  );
};

export default Token;
