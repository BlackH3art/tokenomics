import { ethers } from "ethers";
import { useContract } from "wagmi";

export const useContractProvider = (address: string, ABI: any[]): { contractProvider: ethers.Contract | null } => {

  const provider = new ethers.providers.InfuraProvider("goerli");

  const contractProvider = useContract({
    address: address,
    abi: ABI,
    signerOrProvider: provider
  });

  return { contractProvider };
}