import payload from "payload";
import { FieldHook } from "payload/types";

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

export default vehicleDisplayAfterRead;
