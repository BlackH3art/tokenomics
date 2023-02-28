import { FC, useEffect, useState } from 'react';

import { TokenStats } from '../_Reusable/TokenStats/TokenStats';

import { tokenABIv1, tokenContractAddress } from "../../contracts/contracts";
import { MintTokens } from '../_Reusable/MintTokens/MintTokens';
import { BurnTokens } from '../_Reusable/BurnTokens/BurnTokens';
import { Distribution } from '../_Reusable/Distribution/Distribution';
import { SingleAllocation } from '../../interfaces/SingleAllocation';
import { useContractProvider } from '../../hooks/useContractProvider';
import { numberFromEther } from '../../utils/numberFromEther';
import { useContractEvent } from 'wagmi';


export const TokenV1: FC = () => {

  const [allocations, setAllocations] = useState<SingleAllocation[]>([
    { name:"Founders", address: "0x37859bb30070F276FcdEb3b523d89503bf27c17F", allocation: "10%", balance: "-" },
    { name:"Private sale", address: "0xc135350E38ec11Cb95aF6C1Acd106A97c95c6271", allocation: "10%", balance: "-" },
    { name:"Public sale", address: "0xD2508A652082533d0E9Ce1B4c1294D0e25C36CB2", allocation: "50%", balance: "-" },
    { name:"Mining", address: "0x76B468Db87F6BBAF5e8d57E43DCA169EFa958aA4", allocation: "5%", balance: "-" },
    { name:"Staking pool", address: "0x4fFD7B8B0E3C5946f2aB258D9E446FF8c6a8d9b9", allocation: "15%", balance: "-" },
    { name:"Rewards pool", address: "0x2E6856B83AF7C23DE805a396684d1E62f8c07201", allocation: "10%", balance: "-" },
  ]);

  const { contractProvider: token } = useContractProvider(tokenContractAddress, tokenABIv1);

  useEffect(() => {
    getTokenBalances();
  }, []);

  useContractEvent({
    address: tokenContractAddress,
    abi: tokenABIv1,
    eventName: 'Transfer',
    listener() {
      getTokenBalances();
    },
  });

  async function getTokenBalances() {

    try {
      allocations.forEach(async (item, idx) => {
        const balance = await token?.balanceOf(item.address);
        setAllocations(prev => {
          prev[idx].balance = numberFromEther(balance._hex)
          return [...prev];
        });
      });
    } catch (error) {
      console.log('Error fetching balances');
      console.log(error);
    }
  }


  return (
    <>
      <TokenStats 
        title='Snouts Token V1'
        contractAddres={tokenContractAddress}
        ABI={tokenABIv1}
      />

      <Distribution 
        contractAddres={tokenContractAddress}
        ABI={tokenABIv1}
        allocations={allocations}
      />

      <MintTokens 
        contractAddres={tokenContractAddress}
        ABI={tokenABIv1}
      />

      <BurnTokens 
        contractAddres={tokenContractAddress}
        ABI={tokenABIv1}
      />
    </>
  )
}