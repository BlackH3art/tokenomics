import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import './index.css';

import { WagmiConfig, createClient, configureChains } from 'wagmi';
import { goerli, mainnet } from 'wagmi/chains';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { publicProvider } from 'wagmi/providers/public';
import { ConnectWalletContextProvider } from './context/ConnectWalletContext';
import { PriceContextProvider } from './context/PriceContext';

const { chains, provider, webSocketProvider } = configureChains(
  [goerli],
  [publicProvider()],
)

const client = createClient({
  autoConnect: true,
  provider,
  webSocketProvider,
  connectors: [
    new MetaMaskConnector({ chains }),
  ]
})

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <WagmiConfig client={client}>
      <ConnectWalletContextProvider>
        <PriceContextProvider>
          <App />
        </PriceContextProvider>
      </ConnectWalletContextProvider>
    </WagmiConfig>
  </React.StrictMode>,
)
