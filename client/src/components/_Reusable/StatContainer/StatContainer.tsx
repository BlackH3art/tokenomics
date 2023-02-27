import { FC } from "react";

interface Props {
  title: string;
  value: string;
}

export const StatContainer: FC<Props> = ({ title, value }) => (
  <div className="flex flex-col w-1/4">
    <h2 className="text-sm text-gray-600 uppercase text-center">
      {title}
    </h2>

    <p className="text-2xl font-semibold text-center">
      {value}
    </p>
  </div>
)