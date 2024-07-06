import express from "express";
import bookRouter from "./routes/bookRoute";

const app = express();
const port = 3000;

app.use(express.json());

app.use(bookRouter)

app.listen(port, () => {
  console.log("Server listening on port: ", port);
});
