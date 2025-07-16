const express = require("express");
const {
  createTask,
  getTasks,
  updateTask,
  getbyID,
  deletetask,
} = require("../controllers/taskController");
const AuthCheck = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/create", AuthCheck, createTask);
router.get("/get", AuthCheck, getTasks);
router.get("/get/:id", AuthCheck, getbyID);
router.put("/update/:id", AuthCheck, updateTask);
router.delete("/delete/:id", AuthCheck, deletetask);

module.exports = router;
