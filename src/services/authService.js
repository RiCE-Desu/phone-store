import { pool } from "../config/db.js";
import { registerSchema, loginSchema } from "../validations/authValidation.js";
import validate from "../validations/validate.js";
import bcrypt from "bcrypt"; // Tambah import bcrypt

export const register = async (request) => {
  const validated = validate(registerSchema, request);

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

  // Hash password sebelum disimpan
  const hashedPassword = await bcrypt.hash(password, 10);

  const [users] = await pool.query(
    "INSERT INTO users (fullname, username, email, password, role, address, phone_number, age) VALUES (?,?,?,?,?,?,?,?)",
    [
      fullname,
      username,
      email,
      hashedPassword,
      role,
      address,
      phone_number,
      age,
    ]
  );

  // Objek data user tanpa password
  const newUser = {
    id: users.insertId,
    fullname,
    username,
    email,
    role,
    address,
    phone_number,
    age,
  };

  return newUser;
};

export const login = async (request) => {
 // Validasi input menggunakan validate util yang sama seperti register
 const { email, password } = validate(loginSchema, request);

 // Ambil user berdasarkan email
 const [rows] = await pool.query(
   "SELECT * FROM users WHERE email = ? LIMIT 1",
   [email],
 );

 console.log(rows)

 if (rows.length === 0) {
   // email tidak ditemukan jangan beri tahu mana yang salah (email/password)
   throw new Error("email atau password salah");
 }

 const user = rows[0];

 const isMatch = await bcrypt.compare(password, user.password);

 if (!isMatch) {
   throw new Error("email atau password salah");
 }

 // Kembalikan data user tanpa password
 return {
   id: user.id,
   fullname: user.fullname,
   username: user.username,
   email: user.email,
   role: user.role,
   address: user.address,
   phone_number: user.phone_number,
   age: user.age,
 };
};
