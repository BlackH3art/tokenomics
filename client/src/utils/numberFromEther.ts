import { ethers } from "ethers";

export const numberFromEther = (hexValue: string) => {
  const value = ethers.utils.formatEther(hexValue)
  const converted = Number(value);

  return new Intl.NumberFormat('en-US', { }).format(converted);
}