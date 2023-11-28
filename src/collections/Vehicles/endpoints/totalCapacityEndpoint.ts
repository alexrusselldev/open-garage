import { Endpoint } from "payload/config";

const totalCapacityEndpoint: Omit<Endpoint, "root"> = {
  path: "/:id/totalCapacity",
  method: "get",
  handler: async (req, res, next) => {
    const mongoRes = await req.payload.db.collections["refuels"].aggregate([
      {
        $match: {
          vehicle: req.params.id,
        },
      },
      {
        $group: {
          _id: null,
          totalCapacity: { $sum: "$capacity" },
        },
      },
    ]);

    if (mongoRes.length == 0) {
      res.status(200).send({ totalCapacity: 0 });
      return;
    }

    const result = mongoRes[0].totalCapacity;

    res.status(200).send({ totalCapacity: result });
  },
};

export default totalCapacityEndpoint;
