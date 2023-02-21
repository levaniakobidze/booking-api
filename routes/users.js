import express from "express";
import {
  deleteUser,
  getAllUsers,
  getUser,
  updateUser,
} from "../controllers/user.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";
const router = express.Router();

// AUTHENICATION
router.get("/checkauth", verifyToken, (req, res) => {
  res.send("Hello user. You are authenticated");
});
router.get("/checkuser/:id", verifyUser, (req, res) => {
  res.send("Hello user. You are logged in and you can delete your account");
});
router.get("/checkadmin/:id", verifyAdmin, (req, res, next) => {
  res.send("Hello admin. You are able to delete all accounts");
});
// UPDATE
router.put("/:id", verifyUser, updateUser);
// DELETE
router.delete("/:id", verifyUser, deleteUser);
// GET
router.get("/:id", verifyUser, getUser);

// GET ALL
router.get("/", getAllUsers);

export default router;
