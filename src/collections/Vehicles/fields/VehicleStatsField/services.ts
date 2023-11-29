import { Refuel } from "payload/generated-types";
import { IAverages } from ".";

interface IAveragesData {
  first: Refuel[] & { _id: string }[];
  last: Refuel[] & { _id: string }[];
}

const getTotals = async (id) => {
  const totals = await fetch(`http://localhost:3000/api/vehicles/${id}/totals`);

  return await totals.json();
};

const getRefuels = async (id) => {
  const refuels = await fetch(
    `http://localhost:3000/api/refuels?where[vehicle][equals]=${id}&sort=-createdAt&limit=3`
  );

  return await refuels.json();
};

const getFirstRefuel = async (id) => {
  const firstRefuel = await fetch(
    `http://localhost:3000/api/refuels?where[vehicle][equals]=${id}&sort=createdAt&limit=1`
  );

  return await firstRefuel.json();
};

const getAveragesData = async (id) => {
  const averagesData = await fetch(
    `http://localhost:3000/api/vehicles/${id}/averages`
  );

  return await averagesData.json();
};

const calculateAverages = (data: IAveragesData): IAverages => {
  console.log(data);
  if (data.last.length == 1 || data.last[1]._id == data.first[0]._id) {
    return { fromStart: 0, betweenRefuels: 0 };
  }

  const mplToMpg = 4.544;

  const lifetimeMileage = data.last[0].mileage - data.first[0].mileage;
  const lifetimeAverage = lifetimeMileage / data.last[0].capacityFromStart;

  const betweenRefuelsMileage = data.last[0].mileage - data.last[1].mileage;
  const betweenRefuelsAverage =
    betweenRefuelsMileage / data.last[0].capacitySinceRefill;

  return {
    fromStart: lifetimeAverage,
    betweenRefuels: betweenRefuelsAverage,
  };
};

export {
  getTotals,
  getRefuels,
  getFirstRefuel,
  getAveragesData,
  calculateAverages,
};
