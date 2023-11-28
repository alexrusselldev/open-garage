import { useDocumentInfo } from "payload/dist/admin/components/utilities/DocumentInfo";
import React, { useEffect } from "react";
import { useState } from "react";

type Props = { path: string };

const VehicleStatsField: React.FC<Props> = ({ path }) => {
  const [stats, setStats] = useState<Record<string, any>>();
  const { id } = useDocumentInfo();
  useEffect(() => {
    const fetchData = async () => {
      const totals = await fetch(
        `http://localhost:3000/api/vehicles/${id}/totals`
      );
      setStats(await totals.json());
    };

    fetchData();
  }, []);

  return (
    <div>
      <p>Total Capacity: {stats?.totalCapacity}</p>
      <p>Total Cost: {stats?.totalCost}</p>
    </div>
  );
};

export default VehicleStatsField;
