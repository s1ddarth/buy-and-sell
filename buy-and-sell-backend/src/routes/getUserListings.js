import * as admin from "firebase-admin";
import { db } from "../database";

export const getUserListingsRoute = {
  method: "GET",
  path: "/api/users/{userId}/listings",
  handler: async (req, h) => {
    const token = req.headers.authtoken;
    const user = await admin.auth().verifyIdToken(token);
    const userID = req.params.userId;

    if (user.user_id !== userID) throw Boom.unauthorized("Unauthorized access");

    const { results } = await db.query(
      "SELECT * from listings WHERE user_id=?",
      [userID]
    );
    return results;
  },
};
