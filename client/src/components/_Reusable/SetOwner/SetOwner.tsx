import { ChangeEvent, ChangeEventHandler, FC, FormEvent, FormEventHandler, useState } from "react";
import { useContractWrite, usePrepareContractWrite } from "wagmi";
import { ClipLoader } from "react-spinners";

interface Props {
  contractAddres: string;
  ABI: any[];
}

export const SetOwner: FC<Props> = ({ contractAddres, ABI }) => {

  const [newOwner, setNewOwner] = useState<string>("");

  const { config } = usePrepareContractWrite({
    address: `0x${contractAddres.slice(2)}`,
    abi: ABI,
    functionName: "transferOwnership",
    args: [newOwner]
  });
  const { isLoading, write: transferOwnership } = useContractWrite(config);


  const handleChange: ChangeEventHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewOwner(e.target.value)
  }

  const handleSubmit: FormEventHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    transferOwnership?.();
  }

  return (
    <>
      <section className="w-full flex justify-center pb-96">
        <div className="w-full flex flex-col md:w-4/5 xl:w-3/5 border-[1px] border-gray-500 px-10 py-10">

          <h1 className="text-xl font-semibold">
            Ownership section
          </h1>

          <form onSubmit={handleSubmit} className="grid grid-cols-[1fr_1fr_1fr] gap-5">

            <label>
              <p className="pt-5 pb-2">Transfer ownership to:</p>
              <input name="address" type="text" placeholder="0x... address" onChange={handleChange} className="p-2 px-3 w-full text-sm rounded-lg bg-gray-100 outline outline-1 outline-gray-400" />
            </label>

            <div>&nbsp;</div>

            <button type="submit" disabled={isLoading} className="place-self-end w-full rounded-lg bg-blue-500 border-[1px] border-blue-500 text-sm text-white font-semibold py-2 mt-5">
              {isLoading ? <ClipLoader size={14} color="#ffffff" /> : "set"}
            </button>
          </form>

          
        </div>
      </section>
    </>
  )
}