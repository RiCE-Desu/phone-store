// Get all Users

import * as ProductService from "../services/productService.js";

export const getAllProductsHandler = async (req, res, next) => {
  try {
    const response = await ProductService.getAllProductsHandler();
    res.status(200).json({
      status: "success",
      data: response,
    });
  } catch (error) {
    next(error);
  }
};

export const getProductByIdHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await ProductService.getProductByIdHandler(id);
    res.status(200).json({
      status: "success",
      data: response,
    });
  } catch (error) {
    next(error);
  }
};

export const addProductHandler = async (req, res, next) => {
  try {
    const response = await ProductService.createProductHandler(req.body);

    res.status(201).json({
      status: "success",
      message: "Product create successfully",
      data: response,
    });
  } catch (error) {
    next(error);
  }
};

export const updateProductByIdHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await ProductService.updateProductHandler(id, req.body);

    res.status(201).json({
      status: "success",
      message: "Product update successfully",
      data: response,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteProductByIdHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await ProductService.deleteProductHandler(id, req.body);

    res.status(201).json({
      status: "success",
      message: "Product delete successfully",
      data: response,
    });
  } catch (error) {
    next(error);
  }
};