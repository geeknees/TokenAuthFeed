import { useNetwork } from "wagmi";

const Network: React.FC<{}> = () => {
  const [{ data, error, loading }, switchNetwork] = useNetwork();

  //console.log(data);

  return (
    <>
      <div>
        {data.chain?.name} {data.chain?.unsupported && "(unsupported)"}
        {switchNetwork &&
          data.chains.map((x) =>
            x.id === data.chain?.id
              ? null
              : // 137 = mainnet, 80001 = mumbai
                (x.id === 137 || x.id === 80001) && (
                  <button key={x.id} onClick={() => switchNetwork(x.id)}>
                    Switch to {x.name}
                  </button>
                )
          )}
      </div>

      {error && <div>{error?.message}</div>}
    </>
  );
};

export default Network;
