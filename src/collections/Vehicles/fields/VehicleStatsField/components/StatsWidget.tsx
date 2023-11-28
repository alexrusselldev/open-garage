import React from "react";
interface IProps {
  value: string | number;
  label: string;
}
const StatsWidget: React.FC<IProps> = ({ value, label }) => {
  return (
    <div className="flex flex-col items-center sm:items-start">
      <p className="font-bold text-4xl mb-0">{value}</p>
      <p>{label}</p>
    </div>
  );
};

export default StatsWidget;
