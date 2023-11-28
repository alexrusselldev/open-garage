import { CollectionConfig } from "payload/types";

const Vehicles: CollectionConfig = {
  slug: "vehicles",
  admin: {
    useAsTitle: "nickname",
  },
  fields: [
    {
      name: "registration",
      type: "text",
      required: true,
      admin: {
        placeholder: "Vehicle Registration",
      },
    },
    {
      name: "nickname",
      type: "text",
      admin: {
        placeholder: "Vehicle Nickname",
      },
    },
  ],
};

export default Vehicles;
