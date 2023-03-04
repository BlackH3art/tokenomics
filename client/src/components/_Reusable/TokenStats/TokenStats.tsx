import { FC, useState, useEffect, useContext } from "react";
import { useContractProvider } from "../../../hooks/useContractProvider";

import { StatContainer } from "../StatContainer/StatContainer";

import { numberFromEther } from "../../../utils/numberFromEther";
import { ConnectWalletContext } from "../../../context/ConnectWalletContext";
import { useContractEvent } from "wagmi";


interface Props {
  contractAddres: string;
  ABI: any[];
  title: string;
}

export const TokenStats: FC<Props> = ({ contractAddres, ABI, title }) => {

  const [cap, setCap] = useState<string>("");
  const [supply, setSupply] = useState<string>("");
  const [balance, setBalance] = useState<string>("")
  const [burned, setBurned] = useState<string>("")

  const { connectedAccount } = useContext(ConnectWalletContext);

  const { contractProvider: token } = useContractProvider(contractAddres, ABI);

  useEffect(() => {
    getTokenStats();
  }, [connectedAccount]);

  useContractEvent({
    address: `0x${contractAddres.slice(2)}`,
    abi: ABI,
    eventName: 'Transfer',
    listener() {
      getTokenStats();
    },
  });
  
  async function getTokenStats() {
    try {
      const tokenCap = await token?.cap()
      setCap(numberFromEther(tokenCap._hex));
  
      const tokenSupply = await token?.totalSupply();
      setSupply(numberFromEther(tokenSupply._hex));
  
      if(connectedAccount) {
        const tokenBalance = await token?.balanceOf(connectedAccount);
        setBalance(numberFromEther(tokenBalance._hex));
      }
      
      const tokenBurned = await token?.burned();
      setBurned(numberFromEther(tokenBurned._hex));

    } catch (error) {
      console.log(error);
    }
  }


  return (
    <section className="w-full flex justify-center pt-20">
      <div className="w-full flex flex-col md:w-4/5 xl:w-3/5 items-center border-[1px] border-gray-500 px-5 py-10">

        <h1 className="text-3xl font-semibold">
          {title}
        </h1>
        <p className="text-sm text-gray-400 pb-5">
          {contractAddres}
        </p>

        <div className="flex w-full justify-center py-5">
          <StatContainer title="maximum cap:" value={cap ? cap : "-"} />
          <StatContainer title="total supply:" value={supply ? supply : "-"} />
          <StatContainer title="burned:" value={burned ? burned : "-"} />
          <StatContainer title="your balance:" value={balance ? balance : "-"} />
        </div>
      </div>
    </section>
  )
}