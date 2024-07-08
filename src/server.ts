import express from "express";
import bookRouter from "./routes/bookRoute";
import watchFiles from "./watcher";

const app = express();
const port = 3000;

watchFiles()

app.use(express.json());

app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.send(__dirname);
})

app.use(bookRouter)

app.listen(port, () => {
  console.log("Server listening on port: ", port);
});

