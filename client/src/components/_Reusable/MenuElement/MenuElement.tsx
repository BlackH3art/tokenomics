import { FC } from "react";
import { NavLink, useLocation } from "react-router-dom";

interface Props {
  to: string;
  title: string;
}

export const MenuElement: FC<Props> = ({ title, to }) => {

  const location = useLocation();

  return (
    <NavLink to={to}>
      <li className={`py-4 pl-5 hover:bg-gray-600 duration-150 ${location.pathname === to ? "font-semibold border-b-[1px] bg-gray-500" : ""}`}>
        {title}
      </li>
    </NavLink>
  )
}