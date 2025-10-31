//src/controllers/userController.js
import * as UserService from "../services/userService.js";

// Perubahan penting: menambahkan parameter next agar error dari service diteruskan ke middleware
export const getAllUsersHandler = async (req, res, next) => {
    try {
        const response = await UserService.getAllUser();
        res.status(200).json({
            status: "success",

            data: response,
        });
    } catch (error) {
        next(error); // lempar error ke middleware
    }
};

export const getUserByIdHandler = async (req, res, next) => {
    try {
        const { id } = req.params;
        const response = await UserService.getUserById(id);
        res.status(200).json({
            status: "success",
            data: response,
        });
    } catch (error) {
        next(error); // lempar error ke middleware
    }
};

export const addUserHandler = async (req, res, next) => {
    try {
        const { fullname, username, email, password, role } = req.body;
        const response = await UserService.addUser({ fullname, username, email, password, role });
        res.status(201).json({
            status: "success",
            data: response,
        });
    } catch (error) {
        next(error); // lempar error ke middleware
    }};

export const updateUserHandler = async (req, res, next) => {
    try {
        const { id } = req.params; 
        const response = await UserService.updateUser(id, req.body);
        res.status(200).json({
            status: "success",
            data: response,
        });
    } catch (error) {
        next(error); // lempar error ke middleware
    }};

export const deleteUserByIdHandler = async (req, res, next) => {
    try {
        const { id } = req.params;
        await UserService.deleteUser(id);
        res.status(204).json({
            status: "success",
            message: "User deleted successfully",
        });
    } catch (error) {
        next(error); // lempar error ke middleware
    }};      
