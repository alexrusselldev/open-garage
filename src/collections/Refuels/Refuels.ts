import payload from "payload";
import { CollectionConfig } from "payload/types";
import collectionBeforeChange from "./hooks/collectionBeforeChange";

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
  ],
};

export default Refuels;
