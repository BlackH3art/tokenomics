import { ChangeEvent, ChangeEventHandler, FC, FormEvent, FormEventHandler, useState } from "react";
import { useContractWrite, usePrepareContractWrite } from "wagmi";
import { ClipLoader } from 'react-spinners';

interface Props {
  contractAddres: string;
  ABI: any[];
}

interface MintingData {
  to: string;
  amount: string;
}

export const MintTokens: FC<Props> = ({ contractAddres, ABI }) => {

  const [mintingData, setMintingData] = useState<MintingData>({
    to: "",
    amount: ""
  })

  const { config } = usePrepareContractWrite({
    address: `0x${contractAddres.slice(2)}`,
    abi: ABI,
    functionName: "mint",
    args: [mintingData.to, mintingData.amount]
  });
  const { isLoading, write: mint } = useContractWrite(config);


  const handleChange: ChangeEventHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setMintingData({
      ...mintingData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit: FormEventHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mint?.();
  }

  return (
    <>
      <section className="w-full flex justify-center">
        <div className="w-full flex flex-col md:w-4/5 xl:w-3/5 border-[1px] border-gray-500 px-10 py-10">

          <h1 className="text-xl font-semibold">
            Mint Section
          </h1>

          <form onSubmit={handleSubmit} className="grid grid-cols-[1fr_1fr_1fr] gap-5">
            <label> 
              <p className="pt-5 pb-2">To: </p>
              <input name="to" type="text" placeholder="0x... address" onChange={handleChange} className="p-2 px-3 w-full text-sm rounded-lg bg-gray-100 outline outline-1 outline-gray-400" />
            </label>

            <label>
              <p className="pt-5 pb-2">Amount:</p>
              <input name="amount" type="text" placeholder="amount" onChange={handleChange} className="p-2 px-3 w-full text-sm rounded-lg bg-gray-100 outline outline-1 outline-gray-400" />
            </label>

            <button type="submit" disabled={isLoading} className="place-self-end w-full rounded-lg bg-blue-500 border-[1px] border-blue-500 text-sm text-white font-semibold py-2 mt-5">
              {isLoading ? <ClipLoader size={14} color="#ffffff" /> : "mint"}
            </button>
          </form>

          
        </div>
      </section>
    </>
  )
}