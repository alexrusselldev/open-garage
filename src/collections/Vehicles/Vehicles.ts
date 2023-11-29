import { CollectionConfig } from "payload/types";
import collectionBeforeChange from "./hooks/collectionBeforeChange";
import vehicleTotalsEndpoint from "./endpoints/vehicleTotalsEndpoint";
import VehicleStatsField from "./fields/VehicleStatsField";
import vehicleAveragesEndpoint from "./endpoints/vehicleAveragesEndpoint";

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
      type: "tabs",

      tabs: [
        {
          label: "Statistics",
          fields: [
            {
              name: "vehicleStats",
              type: "ui",
              admin: {
                components: {
                  Field: VehicleStatsField,
                },
              },
            },
          ],
        },
        {
          label: "Settings",
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
        },
      ],
    },
  ],
  endpoints: [vehicleTotalsEndpoint, vehicleAveragesEndpoint],
};

export default Vehicles;
