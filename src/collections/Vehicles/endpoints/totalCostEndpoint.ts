import { Endpoint } from "payload/config";

const totalCostEndpoint: Omit<Endpoint, "root"> = {
  path: "/:id/totalCost",
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
        },
      },
    ]);

    if (mongoRes.length == 0) {
      res.status(200).send({ totalCost: 0 });
      return;
    }

    const result = mongoRes[0].totalCost;

    res.status(200).send({ totalCost: result });
  },
};

export default totalCostEndpoint;
