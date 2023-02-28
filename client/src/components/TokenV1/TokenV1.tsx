import { FC } from 'react';

import { TokenStats } from '../_Reusable/TokenStats/TokenStats';

import { tokenABIv1, tokenContractAddress } from "../../contracts/contracts";
import { MintTokens } from '../_Reusable/MintTokens/MintTokens';
import { BurnTokens } from '../_Reusable/BurnTokens/BurnTokens';


export const TokenV1: FC = () => {

  return (
    <>
      <TokenStats 
        title='Snouts Token V1'
        contractAddres={tokenContractAddress}
        ABI={tokenABIv1}
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