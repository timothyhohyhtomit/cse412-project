import pg from "pg";
const { Pool } = pg;

import { DB } from "../config.js";

const pool = new Pool(DB);

export const sendQuery = async (query) => {
    const db = await pool.connect();
    const result = await db.query(query);
    db.release();
    return result.rows;
};
