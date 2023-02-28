import { FC } from 'react';
import { SingleAllocation } from '../../../interfaces/SingleAllocation';
import { TableCell } from '../TableCell/TableCell';

interface Props {
  contractAddres: string;
  ABI: any[];
  allocations: SingleAllocation[];
}

export const Distribution: FC<Props> = ({ contractAddres, ABI, allocations }) => {

  const tableHeaders = ["name", "address", "allocation", "balance"];

  return (
    <>
      <section className="w-full flex justify-center">
        <div className="w-full flex flex-col md:w-4/5 xl:w-3/5 border-[1px] border-gray-500 px-10 py-10">

          <h1 className="text-xl font-semibold">
            Distribution
          </h1>

          <table className="w-full border-separate border-spacing-y-2">
            <thead>
              <tr>
                {tableHeaders.map((header, idx) => (
                  <th key={idx} className="pt-3 px-2 font-normal uppercase text-sm text-gray-600">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {allocations.map((item, idx) => (
                <tr className="bg-slate-100 hover:bg-slate-200 hover:cursor-pointer duration-300" key={idx}>
                  <TableCell>
                    {item.name}
                  </TableCell>
            
                  <TableCell>
                    <div 
                      className="rounded-lg"
                    >
                      {item.address}
                    </div>
                  </TableCell>
            
                  <TableCell>
                    {item.allocation}
                  </TableCell>

                  <TableCell>
                    {item.balance}
                  </TableCell>
                </tr>
              ))}
            </tbody>
          </table>
          
        </div>
      </section>
    </>
  )
}