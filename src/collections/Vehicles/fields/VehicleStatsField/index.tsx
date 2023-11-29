import { useDocumentInfo } from "payload/dist/admin/components/utilities/DocumentInfo";
import { Refuel } from "payload/generated-types";
import React, { useEffect } from "react";
import { useState } from "react";
import {
  calculateAverages,
  getAveragesData,
  getFirstRefuel,
  getRefuels,
  getTotals,
} from "./services";
import StatsWidget from "./components/StatsWidget";
import RefuelRow from "./components/RefuelRow";

type IProps = { path: string };
interface IRefuelsResponse {
  docs: Refuel[];
}

export interface IAverages {
  fromStart: number;
  betweenRefuels: number;
}

const VehicleStatsField: React.FC<IProps> = ({ path }) => {
  const [totals, setTotals] = useState<Record<string, any>>();
  const [refuels, setRefuels] = useState<IRefuelsResponse>();
  const [firstRefuel, setFirstRefuel] = useState<IRefuelsResponse>();
  const [averagesData, setAveragesData] = useState<IAverages>();
  const { id } = useDocumentInfo();

  const currencyFormatter = new Intl.NumberFormat("en-UK", {
    style: "currency",
    currency: "GBP",
  });

  useEffect(() => {
    const fetchData = async () => {
      setTotals(await getTotals(id));
      setRefuels(await getRefuels(id));
      setFirstRefuel(await getFirstRefuel(id));
      const averagesRes = await getAveragesData(id);

      setAveragesData(calculateAverages(averagesRes));
    };

    fetchData();
  }, []);

  return (
    <div className="grid grid-cols-10 p-8 md:p-0 gap-8">
      <div className="flex flex-col items-center sm:items-start col-span-10 sm:col-span-5 p-8  bg-[#181818]">
        <h2 className="text-3xl w-fit">Lifetime Stats</h2>
        <div className="flex flex-col w-full items-center sm:grid sm:grid-cols-2 md:grid-cols-3">
          <StatsWidget label="Volume (Liters)" value={totals?.totalCapacity} />
          <StatsWidget
            label="Total Fuel Cost"
            value={currencyFormatter.format(totals?.totalCost)}
          />
          <StatsWidget
            label="Total Miles Driven"
            value={refuels?.docs?.[0]?.mileage || "No Data"}
          />
          <StatsWidget
            label="Miles Since Owned"
            value={
              isNaN(
                refuels?.docs?.[0]?.mileage - firstRefuel?.docs?.[0]?.mileage
              )
                ? "No Data"
                : refuels?.docs?.[0]?.mileage - firstRefuel?.docs?.[0]?.mileage
            }
          />
        </div>
      </div>

      <div className="flex flex-col itemc-center sm:items-start col-span-10 sm:col-span-5 p-8 bg-[#181818]">
        <h2 className="text-3xl ">Recent Refuels</h2>
        <div className="w-full">
          <div className="grid grid-cols-3 w-full text-lg">
            <p className="m-0 p-2 h-fit">Volume (Liters)</p>
            <p className="m-0 p-2">Fuel Cost</p>
            <p className="m-0 p-2">Full Tank</p>
          </div>
          {refuels?.docs?.length != undefined && refuels?.docs?.length > 0 ? (
            refuels.docs.map((refuel: Refuel) => {
              return (
                <RefuelRow
                  capacity={refuel.capacity}
                  cost={currencyFormatter.format(refuel.cost)}
                  full={refuel.full}
                  id={refuel.id}
                />
              );
            })
          ) : (
            <div className="mt-8 text-xl text-gray-400 text-center">
              No refuels were found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VehicleStatsField;
