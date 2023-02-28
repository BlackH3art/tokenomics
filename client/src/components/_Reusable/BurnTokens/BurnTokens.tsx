import { ChangeEvent, ChangeEventHandler, FC, FormEvent, FormEventHandler, useState } from "react";
import { ethers } from "ethers";
import { useContractWrite, usePrepareContractWrite } from "wagmi";

interface Props {
  contractAddres: string;
  ABI: any[];
}

interface MintingData {
  to: string;
  amount: string;
}

export const BurnTokens: FC<Props> = ({ contractAddres, ABI }) => {

  const [amountToBurn, setAmountToBurn] = useState<string>("");

  const { config } = usePrepareContractWrite({
    address: `0x${contractAddres.slice(2)}`,
    abi: ABI,
    functionName: "burn",
    args: [amountToBurn]
  });
  const { isSuccess, isLoading, write: burn, isError } = useContractWrite(config);


  const handleChange: ChangeEventHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setAmountToBurn(ethers.utils.parseUnits(e.target.value)._hex)
  }

  const handleSubmit: FormEventHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    burn?.();
  }

  return (
    <>
      <section className="w-full flex justify-center">
        <div className="w-full flex flex-col md:w-4/5 xl:w-3/5 border-[1px] border-gray-500 px-10 py-10">

          <h1 className="text-xl font-semibold">
            Burn Section
          </h1>

          <form onSubmit={handleSubmit} className="grid grid-cols-[1fr_1fr_1fr] gap-5">

            <label>
              <p className="pt-5 pb-2">Amount:</p>
              <input name="amount" type="text" placeholder="amount" onChange={handleChange} className="p-2 px-3 w-full text-sm rounded-lg bg-gray-100 outline outline-1 outline-gray-400" />
            </label>

            <div>&nbsp;</div>

            <button type="submit" className="place-self-end w-full rounded-lg bg-blue-500 border-[1px] border-blue-500 text-sm text-white font-semibold py-2 mt-5">
              burn
            </button>
          </form>

          
        </div>
      </section>
    </>
  )
}