import React from "react";
interface IProps {
  capacity: number;
  cost: string;
  full: boolean;
  id: string;
}
const RefuelRow: React.FC<IProps> = ({ capacity, cost, full, id }) => {
  return (
    <a href={`/admin/collections/refuels/${id}`} className="no-underline">
      <div className="grid grid-cols-3 w-full hover:bg-[#212121]">
        <p className="m-0 p-2 h-fit">{capacity}</p>
        <p className="m-0 p-2">{cost}</p>
        <p className="m-0 p-2">{full ? "Full" : "Not Full"}</p>
      </div>
    </a>
  );
};

export default RefuelRow;
