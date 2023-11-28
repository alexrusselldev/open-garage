import payload from "payload";
import { Field, FieldHook } from "payload/types";

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
    return siblingData["field"];
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

export {
  vehicleDisplayAfterRead,
  displayFieldAfterRead,
  displayTitleAfterRead,
  clearFieldBeforeChange,
};
