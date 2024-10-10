import { db } from "../database";

export const updateListingRoute = {
  method: "POST",
  path: "/api/listings/{id}",
  handler: async (req, h) => {
    const id = req.params.id;
    const { name, description, price } = req.payload;
    const userID = "12345";

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
