import { CollectionBeforeChangeHook } from "payload/types";

const collectionBeforeChange: CollectionBeforeChangeHook = async ({
  data,
  req,
}) => {
  const lastDocRes = await req.payload.find({
    collection: "refuels",
    sort: "-createdAt",
    limit: 10,
    where: {
      vehicle: {
        equals: data.vehicle,
      },
    },
  });

  if (lastDocRes?.docs?.length == undefined || lastDocRes.docs.length == 0) {
    return {
      ...data,
      isReadOnly: true,
      capacitySinceRefill: 0,
      capacityFromStart: 0,
    };
  }

  const lastDoc = lastDocRes.docs[0];

  if (!lastDoc.full && lastDoc.capacitySinceRefill == 0) {
    return {
      ...data,
      capacitySinceRefill: 0,
      capacityFromStart: 0,
    };
  }

  if (lastDoc.full) {
    return {
      ...data,
      capacitySinceRefill: data.capacity,
      capacityFromStart: data.capacity + lastDoc.capacityFromStart,
    };
  }

  return {
    ...data,
    isReadOnly: true,
    capacitySinceRefill: data.capacity + lastDoc.capacitySinceRefill,
    capacityFromStart: data.capacity + lastDoc.capacityFromStart,
  };
};

export { collectionBeforeChange };
