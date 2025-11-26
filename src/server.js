import express from "express";
import { testConnection } from "./config/db.js";
import apiRouter from "./routes/apiRoute.js";

import { errorMiddleware } from "./middlewares/errorMiddleware.js";
import authRouter from "./routes/authRoute.js"; // auth baru

const app = express();

app.use(express.json());

const port = 1210;
app.use(authRouter); // auth baru
app.use(apiRouter);

app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
  testConnection();
});