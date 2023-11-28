import { CollectionBeforeChangeHook } from "payload/types";

const collectionBeforeChange: CollectionBeforeChangeHook = async ({ data }) => {
  if (data.nickname == "" || data.nickname == undefined) {
    return { ...data, nickname: data.registration };
  }

  return data;
};

export default collectionBeforeChange;
