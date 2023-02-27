import { FC, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export const AppBody: FC<Props> = ({ children }) => (
  <div className="">
    {children}
  </div>
)