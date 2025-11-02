import db from "#db/client";
import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

export async function createUser(username, password) {
  //hash password (never store unhashed p/w's)
  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

  const SQL = `
    INSERT INTO users (username, password)
    VALUES ($1, $2)
    RETURNING id, username`;

  const {
    rows: [user],
  } = await db.query(SQL, [username, hashedPassword]);

  return user;
}

export async function getUserById(id) {
  const SQL = `
    SELECT id, username
    FROM users
    WHERE id = $1`;

  const {
    rows: [user],
  } = await db.query(SQL, [id]);
  return user;
}

export async function getUserByUsername(username) {
  const SQL = `
    SELECT * FROM users
    WHERE username = $1`;

  const {
    rows: [user],
  } = await db.query(SQL, [username]);

  // destructuring here is same as writing:  const result = await db.query(sql, [username]);
  // const user = result.rows[0];

  return user;
}
