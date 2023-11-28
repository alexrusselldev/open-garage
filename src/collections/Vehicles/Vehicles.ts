import { CollectionConfig } from "payload/types";
import collectionBeforeChange from "./hooks/collectionBeforeChange";
import totalCostEndpoint from "./endpoints/totalCostEndpoint";

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
    {
      name: "image",
      type: "upload",
      relationTo: "media",
    },
  ],
  endpoints: [totalCostEndpoint],
};

export default Vehicles;
