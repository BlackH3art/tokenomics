import { FC, ReactNode } from "react";

interface Props {
  children: string | number | ReactNode;
}

export const TableCell: FC<Props> = ({ children }) => (
  <td className="p-2 text-center">
    {children}
  </td>
);