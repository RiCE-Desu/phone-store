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
