import { useDocumentInfo } from "payload/dist/admin/components/utilities/DocumentInfo";
import { Refuel } from "payload/generated-types";
import React, { useEffect } from "react";
import { useState } from "react";

type Props = { path: string };
interface IRefuelsResponse {
  docs: Refuel[];
}
const VehicleStatsField: React.FC<Props> = ({ path }) => {
  const [totals, setTotals] = useState<Record<string, any>>();
  const [refuels, setRefuels] = useState<IRefuelsResponse>();
  const [firstRefuel, setFirstRefuel] = useState<IRefuelsResponse>();
  const { id } = useDocumentInfo();

  useEffect(() => {
    const fetchData = async () => {
      const totals = await fetch(
        `http://localhost:3000/api/vehicles/${id}/totals`
      );
      setTotals(await totals.json());

      const refuels = await fetch(
        `http://localhost:3000/api/refuels?where[vehicle][equals]=${id}&sort=-createdAt&limit=3`
      );

      setRefuels(await refuels.json());

      const firstRefuel = await fetch(
        `http://localhost:3000/api/refuels?where[vehicle][equals]=${id}&sort=createdAt&limit=1`
      );

      setFirstRefuel(await firstRefuel.json());
    };

    fetchData();
  }, []);
  const currencyFormatter = new Intl.NumberFormat("en-UK", {
    style: "currency",
    currency: "GBP",
  });

  return (
    <div className="grid grid-cols-10 p-8 md:p-0 gap-8">
      <div className="flex flex-col items-center sm:items-start col-span-10 sm:col-span-5 p-8  bg-[#181818]">
        <h2 className="text-3xl w-fit">Lifetime Stats</h2>
        <div className="flex flex-col w-full items-center sm:grid sm:grid-cols-2 md:grid-cols-3">
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
          <div className="flex flex-col items-center sm:items-start">
            <p className="font-bold text-4xl mb-0">
              {refuels?.docs?.[0]?.mileage}
            </p>
            <p>Total Miles Driven</p>
          </div>
          <div className="flex flex-col items-center sm:items-start">
            <p className="font-bold text-4xl mb-0">
              {refuels?.docs?.[0]?.mileage - firstRefuel?.docs?.[0]?.mileage}
            </p>
            <p>Miles Since Owned</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col itemc-center sm:items-start col-span-10 sm:col-span-5 p-8 bg-[#181818]">
        <h2 className="text-3xl ">Recent Refuels</h2>
        <div className="w-full">
          {refuels?.docs?.length != undefined &&
            refuels?.docs?.length > 0 &&
            refuels.docs.map((refuel: Refuel) => {
              return (
                <a
                  href={`/admin/collections/refuels/${refuel.id}`}
                  className="no-underline"
                >
                  <div className="grid grid-cols-3 w-full hover:bg-[#212121]">
                    <p className="m-0 p-2 h-fit">{refuel.capacity}</p>
                    <p className="m-0 p-2">
                      {currencyFormatter.format(refuel.cost)}
                    </p>
                    <p className="m-0 p-2">
                      {refuel.full ? "Full" : "Not Full"}
                    </p>
                  </div>
                </a>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default VehicleStatsField;
