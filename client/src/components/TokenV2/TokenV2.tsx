import { FC, useEffect, useState } from 'react';

import { TokenStats } from '../_Reusable/TokenStats/TokenStats';

import { tokenABIv2, tokenContractAddressV2 } from "../../contracts/contracts";
import { MintTokens } from '../_Reusable/MintTokens/MintTokens';
import { BurnTokens } from '../_Reusable/BurnTokens/BurnTokens';
import { Distribution } from '../_Reusable/Distribution/Distribution';
import { SingleAllocation } from '../../interfaces/SingleAllocation';
import { useContractProvider } from '../../hooks/useContractProvider';
import { numberFromEther } from '../../utils/numberFromEther';
import { useContractEvent } from 'wagmi';
import { Valuation } from '../_Reusable/Valuation/Valuation';
import { SetOwner } from '../_Reusable/SetOwner/SetOwner';


export const TokenV2: FC = () => {

  const [allocations, setAllocations] = useState<SingleAllocation[]>([
    { name:"Founders", address: "0x37859bb30070F276FcdEb3b523d89503bf27c17F", allocation: "10%", balance: "-" },
    { name:"Marketing", address: "0xc135350E38ec11Cb95aF6C1Acd106A97c95c6271", allocation: "3%", balance: "-" },
    { name:"Development", address: "0xD2508A652082533d0E9Ce1B4c1294D0e25C36CB2", allocation: "2%", balance: "-" },
    { name:"Private sale", address: "0x76B468Db87F6BBAF5e8d57E43DCA169EFa958aA4", allocation: "15%", balance: "-" },
    { name:"Public sale", address: "0x4fFD7B8B0E3C5946f2aB258D9E446FF8c6a8d9b9", allocation: "10%", balance: "-" },
    { name:"Liquidity pool", address: "0x02E96e9F8E61E5f735DEd4D386F3249ca59462E4", allocation: "5%", balance: "-" },
    { name:"Community pool", address: "0xAf997a85a29f5c9E8A88D696086539E17a67911d", allocation: "5%", balance: "-" },
    { name:"Staking", address: "0xafFD814aFdE5f6F5f76A14ea0a1293627b2cFb3f", allocation: "20%", balance: "-" },
    { name:"Rewards", address: "0xD306fB799A9Fe6d857d8Ea558ba9f9d2a129adDc", allocation: "25%", balance: "-" },
    { name:"Utility rewards", address: "0x4bcF37FB9C7b491644f31A0673d42cc67e199AAB", allocation: "5%", balance: "-" },
  ]);

  const { contractProvider: token } = useContractProvider(tokenContractAddressV2, tokenABIv2);

  useEffect(() => {
    getTokenBalances();
  }, []);

  useContractEvent({
    address: tokenContractAddressV2,
    abi: tokenABIv2,
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
        title='Snouts Token V2'
        contractAddres={tokenContractAddressV2}
        ABI={tokenABIv2}
      />

      <Distribution 
        contractAddres={tokenContractAddressV2}
        ABI={tokenABIv2}
        allocations={allocations}
      />

      <Valuation />

      <MintTokens 
        contractAddres={tokenContractAddressV2}
        ABI={tokenABIv2}
      />

      <BurnTokens 
        contractAddres={tokenContractAddressV2}
        ABI={tokenABIv2}
      />

      <SetOwner 
        contractAddres={tokenContractAddressV2}
        ABI={tokenABIv2}
      />
      
    </>
  )
}