import * as admin from "firebase-admin";
import { db } from "../database";

export const deleteListingRoute = {
  method: "DELETE",
  path: "/api/listings/{id}",
  handler: async (req, h) => {
    const token = req.headers.authtoken;
    const user = await admin.auth().verifyIdToken(token);
    const userID = user.user_id;
    const id = req.params.id;
    await db.query("DELETE from listings WHERE id=? AND user_id=?", [
      id,
      userID,
    ]);
    return { message: "Succesfully deleted" };
  },
};
