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
    };
  }

  console.log(lastDocRes.docs);

  const lastDoc = lastDocRes.docs[0];

  if (!lastDoc.full && lastDoc.capacitySinceRefill == 0) {
    return {
      ...data,
      capacitySinceRefill: 0,
    };
  }

  if (lastDoc.full) {
    return {
      ...data,
      capacitySinceRefill: data.capacity,
    };
  }

  return {
    ...data,
    isReadOnly: true,
    capacitySinceRefill: data.capacity + lastDoc.capacitySinceRefill,
  };
};

export { collectionBeforeChange };
