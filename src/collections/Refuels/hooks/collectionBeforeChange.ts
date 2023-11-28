import { CollectionBeforeChangeHook } from "payload/types";

const collectionBeforeChange: CollectionBeforeChangeHook = async ({ data }) => {
  return {
    ...data,
    isReadOnly: true,
  };
};

export default collectionBeforeChange;
