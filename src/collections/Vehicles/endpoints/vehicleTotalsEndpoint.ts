import { Endpoint } from "payload/config";

const vehicleTotalsEndpoint: Omit<Endpoint, "root"> = {
  path: "/:id/totals",
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
          totalCost: { $sum: "$cost" },
          totalCapacity: { $sum: "$capacity" },
        },
      },
    ]);

    if (mongoRes.length == 0) {
      res.status(200).send({ totalCost: 0, totalCapacity: 0 });
      return;
    }
    console.log(mongoRes);

    const result = mongoRes[0];

    res.status(200).send({
      totalCost: result.totalCost,
      totalCapacity: result.totalCapacity,
    });
  },
};

export default vehicleTotalsEndpoint;
