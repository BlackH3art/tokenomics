import { ChangeEventHandler, FC } from "react";

interface Props {
  firstLabel: string;
  firstInputName: string;
  firstInputPlaceholder: string;
  firstInputValue: string;
  secondLabel: string;
  secondInputName: string;
  secondInputPlaceholder: string;
  secondInputValue: string;
  resultLabel: string;
  resultValue: string;
  handleChange: ChangeEventHandler;
  sign: string;
}

export const ValuationRow: FC<Props> = ({ firstLabel, firstInputName, firstInputPlaceholder, firstInputValue, secondLabel, secondInputName, secondInputPlaceholder, secondInputValue, resultLabel, resultValue, handleChange, sign }) => {

  return (
    <div className="grid grid-cols-[1fr_50px_1fr_50px_1fr] gap-5">

      <label>
        <p className="pt-5 pb-2">{firstLabel}:</p>
        <input name={firstInputName} type="text" placeholder={firstInputPlaceholder} value={firstInputValue} onChange={handleChange} className="p-2 px-3 w-full text-sm rounded-lg bg-gray-100 outline outline-1 outline-gray-400" /> 
      </label>

      <div className="justify-self-center flex items-end">
        <p className="pb-2">{sign}</p>
      </div>

      <label>
        <p className="pt-5 pb-2">{secondLabel}:</p>
        <input name={secondInputName} type="text" placeholder={secondInputPlaceholder} value={secondInputValue} onChange={handleChange} className="p-2 px-3 w-full text-sm rounded-lg bg-gray-100 outline outline-1 outline-gray-400" /> 
      </label>

      <div className="justify-self-center flex items-end">
        <p className="pb-2">=</p>
      </div>

      <label>
        <p className="pt-5 pb-3">{resultLabel}:</p>
        <p>
          {resultValue}
        </p>
      </label>

    </div>
  )
}