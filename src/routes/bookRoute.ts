import express from "express";
import * as BookController from "../controllers/bookController";

const router = express.Router();

router
  .route("/books")
  .get(BookController.getAll)
  .post(BookController.createOne);

router
  .route("/books/:id")
  .get(BookController.getOne)
  .patch(BookController.updateOne)
  .delete(BookController.deleteOne);

export default router;
