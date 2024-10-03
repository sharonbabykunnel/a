import dotenv from "dotenv";
dotenv.config();

export const DB_URL = process.env.DB_URL || 'mongodb://localhost:27017';
export const PORT = process.env.PORT || 3000;
