import { FC, useContext } from "react";
import { useBalance } from "wagmi";
import { ConnectWalletContext } from "../../context/ConnectWalletContext";

export const Navigation: FC = () => {

  const { connectWallet, connectedAccount } = useContext(ConnectWalletContext);
  const { data } = useBalance({
    address: `0x${connectedAccount.slice(2)}`,
  });


  return (
    <nav className="w-full h-20 flex justify-center bg-gray-800">
      <div className="w-full md:w-4/5 flex items-center justify-end">

        {connectedAccount ? (
          <div className=" flex text-white">
            <p className="px-2">
              {data?.formatted.slice(0,6)} {data?.symbol}
            </p>
            <p className="px-2">
              {connectedAccount.slice(0,4)}...{connectedAccount.slice(connectedAccount.length - 4)}
            </p>
          </div>
        ) : (
          <button className="bg-blue-600 text-white text-lg font-semibold py-2 px-6 rounded-md" onClick={() => connectWallet()}>
            Connect wallet
          </button>
        )}

      </div>
    </nav>
  )
}