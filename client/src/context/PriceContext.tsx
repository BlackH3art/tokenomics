import { createContext, ReactNode, FC, useState, useEffect } from 'react';

import { PriceContextInterface } from '../interfaces/PriceContextInterface';

export const PriceContext = createContext<PriceContextInterface>({
  ethereumPrice: "",
});

interface Props {
  children: ReactNode;
}

export const PriceContextProvider: FC<Props> = ({ children }) => {

  const [ethereumPrice, setEthereumPrice] = useState<string>('');


  useEffect(() => {
    getEthPrice();
  }, [])

  async function getEthPrice() {
    const resp = await fetch("https://api.binance.com/api/v3/ticker/price?symbol=ETHUSDT");
    const respJson = await resp.json();
    setEthereumPrice(respJson.price);
  }

  return (
    <PriceContext.Provider value={{
      ethereumPrice,
    }}>
      {children}
    </PriceContext.Provider>
  )
}