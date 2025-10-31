// src/services/userService.js
import { request } from "express";
import { pool } from "../config/db.js";
import { ResponseError } from "../errors/responseError.js";
import { createUserSchema, updateUserSchema } from "../validations/userValidation.js";
import validate from "../validations/validate.js";

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

export const addUser = async (request) => {
    const validated = validate(createUserSchema, request);

    const { fullname, username, email, password, role } = validated;

    const [res] = await pool.query(
        "INSERT INTO users (fullname, username, email, password, role) VALUES (?, ?, ?, ?, ?)",
        [fullname, username, email, password, role]
    );

    const result = createUserSchema.safeParse(request);

    console.log("Validate Data", JSON.stringify(result));
};

export const updateUser = async (id, request) => {
    const validated = validate(updateUserSchema, request);
 
    // Ambil data yang sudah valid
    const {
        fullname,
        username,
        email,
        password,
        role,
        address,
        phone_number,
        age,
    } = validated;

    // Masukan ke database
    await pool.query(
        "UPDATE users SET fullname=?, username=?, email=?, password=?, role=?, address=?, phone_number=?, age=? WHERE id=?",

        [fullname, username, email, password, role, address, phone_number, age, id],
    );
};

export const deleteUser = async (id) => {
    const [result] = await pool.query("DELETE FROM users WHERE id=?", [id]);
    if (result.affectedRows === 0) {
        throw new ResponseError(404, "User not found");
    }
};