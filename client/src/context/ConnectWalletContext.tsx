import { createContext, ReactNode, FC, useState } from 'react';
import { useAccount, useConnect, useNetwork, useSwitchNetwork } from 'wagmi';

import { ConnectWalletContextInterface } from '../interfaces/ConnectWalletContextInterface';

export const ConnectWalletContext = createContext<ConnectWalletContextInterface>({
  connectWallet: () => {},
  connectedAccount: "",
});

interface Props {
  children: ReactNode;
}

export const ConnectWalletContextProvider: FC<Props> = ({ children }) => {

  const [connectedAccount, setConnectedAccount] = useState<string>('');

  const { connectAsync, connectors } = useConnect();
  const { address, isConnected } = useAccount();
  const { chain } = useNetwork()
  const { switchNetwork } =
    useSwitchNetwork();


  const connectWallet = async () => {

    if(chain?.id !== 5) {
      switchNetwork?.(5);
    }
    
    if(isConnected && address) {
      setConnectedAccount(address);
    } else {
      const { account } = await connectAsync({ connector: connectors[0] });
      setConnectedAccount(account);
    }

  }


  return (
    <ConnectWalletContext.Provider value={{
      connectWallet,
      connectedAccount
    }}>
      {children}
    </ConnectWalletContext.Provider>
  )
}