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

export { getTotals, getRefuels, getFirstRefuel, getAveragesData };
