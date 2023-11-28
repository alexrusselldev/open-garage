import payload from "payload";
import { CollectionConfig } from "payload/types";
import collectionBeforeChange from "./hooks/collectionBeforeChange";
import vehicleDisplayAfterRead from "./hooks/vehicleDisplayAfterRead";

const Refuels: CollectionConfig = {
  slug: "refuels",
  admin: { useAsTitle: "fullTitle" },
  hooks: { beforeChange: [collectionBeforeChange] },
  fields: [
    {
      name: "isReadOnly",
      type: "checkbox",
      admin: { hidden: true },
      defaultValue: false,
    },
    {
      name: "vehicle",
      type: "relationship",
      admin: {
        condition: (data) => {
          return !data.isReadOnly;
        },
      },
      relationTo: "vehicles",
      required: true,
      hasMany: false,
    },
    {
      name: "vehicleDisplay",
      label: "Vehicle",
      type: "text",
      admin: {
        readOnly: true,
        condition: (data) => {
          return data.isReadOnly;
        },
      },
      hooks: {
        afterRead: [vehicleDisplayAfterRead],
      },
    },
  ],
};

export default Refuels;
