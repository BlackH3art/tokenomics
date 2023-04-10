import { FC } from "react";
import { MenuElement } from "../_Reusable/MenuElement/MenuElement";

export const Menu: FC = () => {

  return (
    <>
      <div className="bg-gray-700 fixed w-4/5 md:w-3/5 lg:w-2/5 xl:w-1/5 h-full right-0 top-0">
        
        <h2 className="mt-20 pt-10 pb-4 text-center text-white uppercase text-lg font-semibold">
          menu
        </h2>

        <ul className="px-10 text-gray-200">
          <MenuElement title="Token V1" to="/tokenV1" />
          <MenuElement title="Token V2" to="/tokenV2" />
          <MenuElement title="Token V3" to="/tokenV3" />
        </ul>

      </div>
    </>
  )
}