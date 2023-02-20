import express from "express";
import {
  deleteUser,
  getAllUsers,
  getUser,
  updateUser,
} from "../controllers/user.js";
import { verifyToken } from "../utils/verifyToken.js";
const router = express.Router();

// AUTHENICATION
router.get("/checkauth", verifyToken, (req, res) => {
  res.send("Hello user. You are authenticated");
});
router.get("/checkadmin", verifyToken, (req, res, next) => {
  res.send("Hello admin. You are able to delete all accounts");
});
// UPDATE
router.put("/:id", updateUser);
// DELETE
router.delete("/:id", deleteUser);
// GET
router.get("/:id", getUser);

// GET ALL
router.get("/", getAllUsers);

export default router;
