import { pool } from "../config/db.js";
import { ResponseError } from "../errors/responseError.js";
import {
  createProductSchema,
  updateProductSchema,
} from "../validations/productValidation.js";
import validate from "../validations/validate.js";

export const getAllProductsHandler = async () => {
  const [products] = await pool.query(
    "SELECT id, user_id, name, description, price, stock FROM products"
  );

  return products;
};

export const getProductByIdHandler = async (id) => {
  const [products] = await pool.query(
    "SELECT id, user_id, name, description, price, stock FROM products WHERE id=?",
    [id]
  );

  if (products.length === 0) {
    throw new ResponseError(404, "product not found");
  }

  return products[0];
  ``;
};

export const createProductHandler = async (request) => {
  const validated = validate(createProductSchema, request);
  const { user_id, name, description, price, stock } = validated;

  const [products] = await pool.query(
    "INSERT INTO products (user_id, name, description, price, stock) VALUES (?,?,?,?,?)",
    [user_id, name, description, price, stock]
  );

  const newProduct = {
    id: products.insertId,
    user_id,
    name,
    description,
    price,
    stock,
  };

  return newProduct;
};

export const updateProductHandler = async (id, request) => {
  const validated = validate(updateProductSchema, request);
  const { user_id, name, description, price, stock } = validated;
  const [products] = await pool.query(
    "UPDATE products SET user_id=?, name=?, description=?, price=?, stock=? WHERE id=?",
    [user_id, name, description, price, stock, id]
  );

  const productUpdate = await pool.query(
    "SELECT id, user_id, name, description, price, stock FROM products WHERE id=?",
    [id]
  );

  return productUpdate[0];
};

export const deleteProductHandler = async (id, request) => {
  const [deleteProduct] = await pool.query("DELETE FROM products WHERE id=?", [
    id,
  ]);

  if (deleteProduct.affectedRows === 0) {
    throw new ResponseError(404, "product not found");
  }
};