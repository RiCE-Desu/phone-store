import express from "express";
import {
  addUsersHandler,
  getAllUsersHandler,
  getUserByIdHandler,
  updateUsersHandler,
  deleteUsersByIdHandler
} from "../handler/usersHandler.js";

import {
  addProductHandler,
  deleteProductByIdHandler,
  getAllProductsHandler,
  getProductByIdHandler,
  updateProductsHandler
} from "../handler/productHandler.js";

const apiRouter = express.Router();

apiRouter.get("/users", getAllUsersHandler);
apiRouter.get("/users/:id", getUserByIdHandler);
apiRouter.post("/users", addUsersHandler);
apiRouter.put("/users/:id", updateUsersHandler);
apiRouter.delete("/users/:id", deleteUsersByIdHandler);

apiRouter.get("/products", getAllProductsHandler);
apiRouter.get("/products/:id", getProductByIdHandler);
apiRouter.post("/products", addProductHandler);
apiRouter.put("/products/:id", updateProductsHandler);
apiRouter.delete("/products/:id", deleteProductByIdHandler);

export default apiRouter; 