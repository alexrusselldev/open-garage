import { Endpoint } from "payload/config";

const vehicleAveragesEndpoint: Omit<Endpoint, "root"> = {
  path: "/:id/averages",
  method: "get",
  handler: async (req, res, next) => {
    const mongoRes = await req.payload.db.collections["refuels"].aggregate([
      {
        $match: { $and: [{ vehicle: req.params.id }, { full: true }] },
      },
      {
        $facet: {
          first: [{ $sort: { createdAt: 1 } }, { $limit: 1 }],
          last: [{ $sort: { createdAt: -1 } }, { $limit: 2 }],
        },
      },
      {
        $group: {
          _id: null,
          first: { $first: "$first" },
          last: { $last: "$last" },
        },
      },
    ]);

    console.log(mongoRes[0]);

    if (mongoRes.length == 0) {
      res.status(200).send({ noData: true });
      return;
    }

    const result = mongoRes[0];

    res.status(200).send({
      first: result.first,
      last: result.last,
    });
  },
};

export default vehicleAveragesEndpoint;
