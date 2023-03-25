import { FC, ChangeEventHandler, ChangeEvent, useState, useContext } from "react";
import { PriceContext } from "../../../context/PriceContext";
import { ValuationRow } from "../ValuationRow/ValuationRow";

interface Props {
  variant: number;
}

export const Valuation: FC<Props> = ({ variant }) => {

  const [valuationData, setValuationData] = useState({
    capitalization: "",
    totalSupply: "",
    liquidityPoolPrice: "",
    liquidityAllocation: "",
    privateSalePrice: "",
    privateSaleAllocation: "",
    publicSalePrice: "",
    publicSaleAllocation: ""
  });
  const { ethereumPrice } = useContext(PriceContext);


  const handleChange: ChangeEventHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setValuationData({
      ...valuationData,
      [e.target.name]: e.target.value
    });
  }

  const pricePerToken = Number(valuationData.capitalization) / Number(valuationData.totalSupply);
  const liquidityValue = Number(valuationData.liquidityPoolPrice) * Number(valuationData.liquidityAllocation);
  const privateRaisedFunds = Number(valuationData.privateSalePrice) * Number(valuationData.privateSaleAllocation);
  const publiclyRaisedFunds = Number(valuationData.publicSalePrice) * Number(valuationData.publicSaleAllocation);

  return (
    <>
      <section className="w-full flex justify-center">
        <div className="w-full flex flex-col md:w-4/5 xl:w-3/5 border-[1px] border-gray-500 px-10 py-10">

          <h1 className="text-xl font-semibold">
            Valuation Variant {variant}
          </h1>


          <ValuationRow 
            firstLabel="Estimated valuation"
            firstInputName="capitalization"
            firstInputPlaceholder="capitalization ($)"
            firstInputValue={valuationData.capitalization}
            secondLabel="Total supply"
            secondInputName="totalSupply"
            secondInputPlaceholder="total supply"
            secondInputValue={valuationData.totalSupply}
            resultLabel="Price per token"
            resultValue={isNaN(pricePerToken) ? "0" : `$${pricePerToken.toFixed(6)}`}
            handleChange={handleChange}
            sign="/"
          />

          <ValuationRow 
            firstLabel="Private sale price"
            firstInputName="privateSalePrice"
            firstInputPlaceholder="private sale price ($)"
            firstInputValue={valuationData.privateSalePrice}
            secondLabel="Private sale allocation"
            secondInputName="privateSaleAllocation"
            secondInputPlaceholder="tokens amount"
            secondInputValue={valuationData.privateSaleAllocation}
            resultLabel="Privately raised funds"
            resultValue={isNaN(privateRaisedFunds) ? "0" : `$${new Intl.NumberFormat('en-US', { }).format(privateRaisedFunds)} / ${(privateRaisedFunds / Number(ethereumPrice)).toFixed(4)} ETH`}
            handleChange={handleChange}
            sign="*"
          />

          <ValuationRow 
            firstLabel="Public sale price"
            firstInputName="publicSalePrice"
            firstInputPlaceholder="public sale price ($)"
            firstInputValue={valuationData.publicSalePrice}
            secondLabel="Public sale allocation"
            secondInputName="publicSaleAllocation"
            secondInputPlaceholder="tokens amount"
            secondInputValue={valuationData.publicSaleAllocation}
            resultLabel="Publicly raised funds"
            resultValue={isNaN(publiclyRaisedFunds) ? "0" : `$${new Intl.NumberFormat('en-US', { }).format(publiclyRaisedFunds)}  / ${(publiclyRaisedFunds / Number(ethereumPrice)).toFixed(4)} ETH`}
            handleChange={handleChange}
            sign="*"
          />

          <ValuationRow 
            firstLabel="Liquidity pool price"
            firstInputName="liquidityPoolPrice"
            firstInputPlaceholder="initial price ($)"
            firstInputValue={valuationData.liquidityPoolPrice}
            secondLabel="Liquidity allocation"
            secondInputName="liquidityAllocation"
            secondInputPlaceholder="tokens amount"
            secondInputValue={valuationData.liquidityAllocation}
            resultLabel="Second pool token value"
            resultValue={isNaN(liquidityValue) ? "0" : `$${new Intl.NumberFormat('en-US', { }).format(liquidityValue)} / ${(liquidityValue / Number(ethereumPrice)).toFixed(4)} ETH`}
            handleChange={handleChange}
            sign="*"
          />
          
        </div>
      </section>
    </>
  )
}