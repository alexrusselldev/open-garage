import { useDocumentInfo } from "payload/dist/admin/components/utilities/DocumentInfo";
import React, { useEffect } from "react";
import { useState } from "react";

type Props = { path: string };

const VehicleStatsField: React.FC<Props> = ({ path }) => {
  const [totals, setTotals] = useState<Record<string, any>>();
  const { id } = useDocumentInfo();
  useEffect(() => {
    const fetchData = async () => {
      const totals = await fetch(
        `http://localhost:3000/api/vehicles/${id}/totals`
      );
      setTotals(await totals.json());
    };

    fetchData();
  }, []);
  const currencyFormatter = new Intl.NumberFormat("en-UK", {
    style: "currency",
    currency: "GBP",
  });

  return (
    <div className="grid grid-cols-10 p-8 md:p-0">
      <div className="flex flex-col items-center col-span-10 sm:col-span-5">
        <h2 className="text-3xl w-fit">Lifetime Stats</h2>
        <div className="flex flex-col items-center sm:grid sm:grid-cols-2 md: grid-cols-3">
          <div className="flex flex-col items-center sm:items-start">
            <p className="font-bold text-4xl mb-0">{totals?.totalCapacity}</p>
            <p>Fuel (Liters)</p>
          </div>
          <div className="flex flex-col items-center sm:items-start">
            <p className="font-bold text-4xl mb-0">
              {currencyFormatter.format(totals?.totalCost)}
            </p>
            <p>Total Fuel Cost</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleStatsField;
