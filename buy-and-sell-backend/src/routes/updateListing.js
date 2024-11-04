import * as admin from "firebase-admin";
import { db } from "../database";

export const updateListingRoute = {
  method: "POST",
  path: "/api/listings/{id}",
  handler: async (req, h) => {
    const token = req.headers.authtoken;
    const user = await admin.auth().verifyIdToken(token);
    const userID = user.user_id;
    const id = req.params.id;
    const { name, description, price } = req.payload;

    if (user.user_id !== userID) throw Boom.unauthorized("Unauthorized access");

    await db.query(
      "UPDATE listings SET name=?, description=?, price=? WHERE id=? AND user_id=?",
      [name, description, price, id, userID]
    );

    const { results } = await db.query(
      "SELECT * from listings WHERE id=? AND user_id=?",
      [id, userID]
    );

    return results[0];
  },
};
