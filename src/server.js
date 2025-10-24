import express from "express";
import { testConnection } from "./config/db.js";
import apiRouter from "./routes/apiRoute.js";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";

// membuat server
const app = express();
const port = 1210;

app.use(express.json());
 
app.use(apiRouter);

app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`server running at http://localhost:${port}`);
  testConnection();
});