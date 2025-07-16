const mongoose = require("mongoose");
const taskModel = require("../models/Task");

// Create Task
const createTask = async (req, res) => {
  try {
    const { title, description, status } = req.body;
    const userId = req.userId;

    if (!title || !userId) {
      return res.status(400).json({
        error: true,
        message: "Title and User ID are required",
      });
    }

    const task = await taskModel.create({
      title,
      description,
      status,
      user: new mongoose.Types.ObjectId(userId),
    });

    return res.status(201).json({
      error: false,
      message: "Task created successfully",
      data: task,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      const errors = Object.keys(error.errors).map((field) => ({
        field,
        message: error.errors[field].message,
      }));
      return res.status(400).json({
        error: true,
        message: "Validation failed",
        details: errors,
      });
    }

    console.error("Error creating task:", error.message);
    return res.status(500).json({
      error: true,
      message: "Internal server error",
      detail: error.message,
    });
  }
};

// Get All Tasks for Logged-in User
const getTasks = async (req, res) => {
  try {
    const userId = req.userId;
    const userobjid = new mongoose.Types.ObjectId(userId);
    const tasks = await taskModel
      .find({ user: userobjid })
      .populate("user", "name _id ")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      error: false,
      message: "Tasks fetched successfully",
      data: tasks,
    });
  } catch (error) {
    console.error("Error getting tasks:", error.message);
    return res.status(500).json({
      error: true,
      message: "Internal server error",
      detail: error.message,
    });
  }
};

// Get Task by ID
const getbyID = async (req, res) => {
  try {
    const taskId = req.params.id;
    const userId = req.userId;

    if (!mongoose.Types.ObjectId.isValid(taskId)) {
      return res.status(400).json({ error: true, message: "Invalid task ID" });
    }

    const userobjid = new mongoose.Types.ObjectId(userId);

    const task = await taskModel
      .findOne({ _id: taskId, user: userobjid })
      .populate("user", "name _id");

    if (!task) {
      return res.status(404).json({ error: true, message: "Task not found" });
    }

    return res.status(200).json({
      error: false,
      message: "Task fetched successfully",
      data: task,
    });
  } catch (error) {
    console.error("Error getting task by ID:", error.message);
    return res.status(500).json({
      error: true,
      message: "Internal server error",
      detail: error.message,
    });
  }
};

// Update Task (by ID)
const updateTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const userId = req.userId;
    const { title, description, status } = req.body;
    const userobjid = new mongoose.Types.ObjectId(userId);

    if (!mongoose.Types.ObjectId.isValid(taskId)) {
      return res.status(400).json({ error: true, message: "Invalid task ID" });
    }

    const updatedTask = await taskModel
      .findOneAndUpdate(
        { _id: taskId, user: userobjid },
        { title, description, status },
        { new: true, runValidators: true }
      )
      .populate("user", "name _id");

    if (!updatedTask) {
      return res
        .status(404)
        .json({ error: true, message: "Task not found or unauthorized" });
    }

    return res.status(200).json({
      error: false,
      message: "Task updated successfully",
      data: updatedTask,
    });
  } catch (error) {
    console.error("Error updating task:", error.message);
    return res.status(500).json({
      error: true,
      message: "Internal server error",
      detail: error.message,
    });
  }
};

//  Delete Task
const deletetask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const userId = req.userId;
    const userobjid = new mongoose.Types.ObjectId(userId);

    if (!mongoose.Types.ObjectId.isValid(taskId)) {
      return res.status(400).json({ error: true, message: "Invalid task ID" });
    }

    const deletedTask = await taskModel.findOneAndDelete({
      _id: taskId,
      user: userobjid,
    });

    if (!deletedTask) {
      return res
        .status(404)
        .json({ error: true, message: "Task not found or unauthorized" });
    }

    return res.status(200).json({
      error: false,
      message: "Task deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting task:", error.message);
    return res.status(500).json({
      error: true,
      message: "Internal server error",
      detail: error.message,
    });
  }
};

module.exports = {
  createTask,
  getTasks,
  getbyID,
  updateTask,
  deletetask,
};
