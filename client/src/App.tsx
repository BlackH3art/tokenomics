import { FC, useState } from "react";
import { Routes, Route, Navigate } from 'react-router-dom';
import { AppBody } from "./components/AppBody/AppBody";
import { Menu } from "./components/Menu/Menu";
import { Navigation } from "./components/Navigation/Navigation";
import { TokenV1 } from "./components/TokenV1/TokenV1";
import { TokenV2 } from "./components/TokenV2/TokenV2";


export const App: FC = () => {

  const [showMenu, setShowMenu] = useState<boolean>(false);

  return (
    <AppBody>

      <Navigation setShowMenu={setShowMenu} />
      {showMenu && <Menu /> }

      <Routes>
        <Route path='/' element={ <Navigate to={`/tokenV1`} />} />
        <Route path='/tokenV1' element={ <TokenV1 /> } />
        <Route path='/tokenV2' element={ <TokenV2 /> } />

        <Route path="/*" element={ <Navigate to={`/`} />} />
      </Routes>
      
    </AppBody>
  )
}

