import { Dispatch, FC, SetStateAction, useContext } from "react";
import { useBalance } from "wagmi";
import { ConnectWalletContext } from "../../context/ConnectWalletContext";
import { PriceContext } from "../../context/PriceContext";

import eth from '../../images/eth.png';

interface Props {
  setShowMenu: Dispatch<SetStateAction<boolean>>;
}

export const Navigation: FC<Props> = ({ setShowMenu }) => {

  const { connectWallet, connectedAccount } = useContext(ConnectWalletContext);
  const { ethereumPrice } = useContext(PriceContext);
  const { data } = useBalance({
    address: `0x${connectedAccount.slice(2)}`,
  });


  return (
    <nav className="w-full fixed h-20 flex justify-center bg-gray-800 z-10">
      <div className="w-full md:w-4/5 flex items-center justify-between">

        <div className="flex items-center">
          <img src={eth} className="h-10 px-5" />
          <p className="text-white text-xl">
            ${Number(ethereumPrice).toFixed(2)}
          </p>
        </div>

        <div className="flex items-center">

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

          <button className="w-[1.6rem] mx-5" onClick={() => setShowMenu(prev => !prev)}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
              <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" fill="#fff"/>
            </svg>
          </button>

        </div>

      </div>
    </nav>
  )
}