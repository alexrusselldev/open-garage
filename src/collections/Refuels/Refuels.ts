import payload from "payload";
import { CollectionConfig, Condition } from "payload/types";
import { collectionBeforeChange } from "./hooks/collectionHooks";
import {
  clearFieldBeforeChange,
  displayFieldAfterRead,
  displayTitleAfterRead,
  vehicleDisplayAfterRead,
} from "./hooks/fieldHooks";

const isReadOnly: Condition<any, any> = (data) => {
  return data.isReadOnly;
};

const isNotReadOnly: Condition<any, any> = (data) => {
  return !data.isReadOnly;
};

const Refuels: CollectionConfig = {
  slug: "refuels",
  admin: { useAsTitle: "fullTitle" },
  hooks: { beforeChange: [collectionBeforeChange] },
  fields: [
    // admin field for controlling write-once logic
    {
      name: "isReadOnly",
      type: "checkbox",
      admin: { hidden: true },
      defaultValue: false,
    },

    // virtual field for generating display title
    {
      name: "fullTitle",
      type: "text",
      admin: {
        hidden: true,
      },
      hooks: {
        beforeChange: [clearFieldBeforeChange("fullTitle")],
        afterRead: [displayTitleAfterRead],
      },
    },

    // vehicle relationship fields
    {
      name: "vehicle",
      type: "relationship",
      admin: {
        condition: isNotReadOnly,
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
        condition: isReadOnly,
      },
      hooks: {
        afterRead: [vehicleDisplayAfterRead],
      },
    },

    // numerical data fields
    {
      type: "row",
      fields: [
        {
          name: "mileage",
          type: "number",
          admin: {
            condition: isNotReadOnly,
          },
          required: true,
        },
        {
          name: "mileageDisplay",
          label: "Mileage",
          type: "number",
          admin: {
            readOnly: true,
            condition: isReadOnly,
          },
          hooks: {
            afterRead: [displayFieldAfterRead("mileage")],
          },
        },
        {
          name: "capacity",
          type: "number",
          admin: {
            condition: isNotReadOnly,
          },
          required: true,
        },
        {
          name: "capacityDisplay",
          label: "Capacity",
          type: "number",
          admin: {
            readOnly: true,
            condition: isReadOnly,
          },
          hooks: {
            afterRead: [displayFieldAfterRead("capacity")],
          },
        },
        {
          name: "cost",
          type: "number",
          admin: {
            condition: isNotReadOnly,
          },
          required: true,
        },
        {
          name: "costDisplay",
          label: "Cost",
          type: "number",
          admin: {
            readOnly: true,
            condition: isReadOnly,
          },
          hooks: {
            afterRead: [displayFieldAfterRead("cost")],
          },
        },
      ],
    },
  ],
};

export default Refuels;
