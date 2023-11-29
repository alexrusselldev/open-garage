import payload from "payload";
import { FieldHook, Validate } from "payload/types";

const vehicleDisplayAfterRead: FieldHook = async ({ data }) => {
  const vehicle = await payload
    .findByID({
      collection: "vehicles",
      id: data.vehicle,
    })
    .catch((e) => {
      return { nickname: "Unknown Vehicle" };
    });

  return vehicle.nickname;
};

const displayFieldAfterRead = (field: string): FieldHook => {
  return ({ siblingData }) => {
    return siblingData[field];
  };
};

const displayTitleAfterRead: FieldHook = async ({ data }) => {
  const vehicle = await payload
    .findByID({
      collection: "vehicles",
      id: data.vehicle,
    })
    .catch((e) => {
      return { nickname: "Unknown Vehicle" };
    });

  return `${vehicle.nickname} - ${data.createdAt.split("T")[0]}`;
};

const clearFieldBeforeChange = (field: string): FieldHook => {
  return ({ siblingData }) => {
    delete siblingData[field];
  };
};

const validateMileage: Validate = async (
  value,
  { siblingData }
): Promise<string | true> => {
  if (!siblingData.vehicle) return true;

  const refuelsQuery = await fetch(
    `http://localhost:3000/api/refuels?where[vehicle][equals]=${siblingData.vehicle}&sort=-createdAt`
  );
  const refuelRes = await refuelsQuery.json();

  if (refuelRes?.docs?.length == undefined || refuelRes.docs.length == 0)
    return true;

  const latestRefuel = refuelRes.docs[0];

  if (value < latestRefuel.mileage)
    return `Must be higher than previous: ${latestRefuel.mileage}`;

  return true;
};

export {
  vehicleDisplayAfterRead,
  displayFieldAfterRead,
  displayTitleAfterRead,
  validateMileage,
  clearFieldBeforeChange,
};
