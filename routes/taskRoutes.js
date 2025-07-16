const express = require("express");
const {
  createTask,
  getTasks,
  updateTask,
  getTaskById,
  deleteTask,
} = require("../controllers/taskController");
const AuthCheck = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/create", AuthCheck, createTask);
router.get("/get", AuthCheck, getTasks);
router.get("/get/:id", AuthCheck, getTaskById);
router.put("/update/:id", AuthCheck, updateTask);
router.delete("/delete/:id", AuthCheck, deleteTask);

module.exports = router;
