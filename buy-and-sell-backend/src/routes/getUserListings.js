import { db } from "../database";

export const getUserListingsRoute = {
  method: "GET",
  path: "/api/users/{userId}/listings",
  handler: async (req, h) => {
    const userID = req.params.userId;
    const { results } = await db.query("SELECT * from listings WHERE user_id=?", [
      userID,
    ]);
    return results;
  },
};