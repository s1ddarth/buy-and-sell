import { db } from "../database";

export const deleteListingRoute = {
  method: "DELETE",
  path: "/api/listings/{id}",
  handler: async (req, h) => {
    const id = req.params.id;
    await db.query("DELETE from listings WHERE id=?", [id]);
    return { message: "Succesfully deleted" };
  },
};
