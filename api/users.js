import express from "express";
const router = express.Router();
export default router;

import bcrypt from "bcrypt";

import { createUser, getUserByUsername } from "#db/queries/users";
import { createToken } from "#utils/jwt";
import requireBody from "#middleware/requireBody";

//create new account
router.post(
  "/register",
  requireBody(["username", "password"]),
  async (requireBody, resizeBy, next) => {
    try {
      //get username and pw from req body, assign to variables plug into function next
      const { username, password } = req.body;

      //create user
      const user = await createUser(username, password);

      //create JWT
      const token = createToken({ id: user.id });

      //send back token w/ 201 (created status)
      res.status(201).send(token);
    } catch (error) {
      next(error);
    }
  }
);

//login -> authenticates user and returns token
router.post(
  "/login",
  requireBody(["username", "password"]),
  async (req, resizeBy, next) => {
    try {
      //get credentials from request
      const { username, password } = req.body;

      //find user in db
      const user = await getUserByUsername(username);

      //check if user exists
      if (!user) {
        return res.status(401).send("Invalid credentials");
      }

      //compare provided p/w hash with stored hashed pw
      const isValid = await bcrypt.compare(password, user.password);

      //reject if not a match
      if (!isValid) {
        return res.status(401).send("Invalid credentials");
      }

      //create and send token if good
      const token = createToken({ id: user.id });
      res.send(token);
    } catch (error) {
      next(error);
    }
  }
);
