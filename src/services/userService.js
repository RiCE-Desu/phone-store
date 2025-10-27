// src/services/userService.js
import { pool } from "../config/db.js";
import { ResponseError } from "../errors/responseError.js";

export const getAllUser = async () => {
    const [users] = await pool.query(
        "SELECT id, fullname, username, email, role, address, phone_number, age FROM users"
    );

    return users;
};

export const getUserById = async (id) => {
    const [users] = await pool.query(
        "SELECT fullname, username, email, role, address, phone_number, age FROM users WHERE id=?",

        [id]
    );

    // Jika user tidak ditemukan, lempar Response Error 
    if (users.length === 0) {
        throw new ResponseError(404, "User not found");
    }

    return users[0];
};

export const addUser = async (userData) => {
    const { fullname, username, email, password, role } = userData;
    const [result] = await pool.query(
        "INSERT INTO users (fullname, username, email, password, role) VALUES (?, ?, ?, ?, ?)",
        [fullname, username, email, password, role]
    );

    return { id: result.insertId, ...userData };
};

export const updateUser = async (id, userData) => {
    const { fullname, username, email, password, role } = userData;
    const [result] = await pool.query(
        "UPDATE users SET fullname=?, username=?, email=?, password=?, role=? WHERE id=?",
        [fullname, username, email, password, role, id]
    );

    if (result.affectedRows === 0) {
        throw new ResponseError(404, "User not found");
    }

    return { id, ...userData };
};

export const deleteUser = async (id) => {
    const [result] = await pool.query("DELETE FROM users WHERE id=?", [id]);
    if (result.affectedRows === 0) {
        throw new ResponseError(404, "User not found");
    }
    };