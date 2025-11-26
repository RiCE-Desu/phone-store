import express from "express";
import {
  addUserHandler,
  getAllUsersHandler,
  getUserByIdHandler,
  updateUserHandler,
  deleteUserByIdHandler
} from "../controllers/userController.js";

import {
  addProductHandler,
  deleteProductByIdHandler,
  getAllProductsHandler,
  getProductByIdHandler,
  updateProductByIdHandler,
} from "../controllers/productController.js";

const apiRouter = express.Router();
apiRouter.get("/users", getAllUsersHandler);
apiRouter.get("/users/:id", getUserByIdHandler);
apiRouter.post("/users", addUserHandler);
apiRouter.put("/users/:id", updateUserHandler);
apiRouter.delete("/users/:id", deleteUserByIdHandler);

apiRouter.get("/products", getAllProductsHandler);
apiRouter.get("/products/:id", getProductByIdHandler);
apiRouter.post("/products", addProductHandler);
apiRouter.put("/products/:id", updateProductByIdHandler);
apiRouter.delete("/products/:id", deleteProductByIdHandler);

export default apiRouter; 