import { FC } from "react";
import { AppBody } from "./components/AppBody/AppBody";
import { Navigation } from "./components/Navigation/Navigation";
import { TokenV1 } from "./components/TokenV1/TokenV1";


export const App: FC = () => {

  return (
    <AppBody>

      <Navigation />

      <TokenV1 />
      
      
    </AppBody>
  )
}

