import { CollectionConfig } from "payload/types";
import collectionBeforeChange from "./hooks/collectionBeforeChange";

const Vehicles: CollectionConfig = {
  slug: "vehicles",
  admin: {
    useAsTitle: "nickname",
  },
  hooks: {
    beforeChange: [collectionBeforeChange],
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
