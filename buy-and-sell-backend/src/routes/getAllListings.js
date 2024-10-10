import { db } from "../database";

export const getAllListingsRoute = {
  method: "GET",
  path: "/api/listings",
  handler: async (req, h) => {
    const results = await db.query('SELECT * from listings');
    return results;
  },
};
