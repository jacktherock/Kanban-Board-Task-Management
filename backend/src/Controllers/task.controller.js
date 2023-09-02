const { Response } = require("../services/services");
const Task = require("../models/task.model");


// get all tasks
const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(Response(false, "Tasks retrieved successfully", tasks));
    } catch (err) {
        res.status(500).json(Response(true, "Error retrieving tasks", err.message));
    }
};

// create a task
const createTask = async (req, res) => {
    const task = new Task({
        title: req.body.title,
        description: req.body.description,
        category: req.body.category,
    });

    try {
        const newTask = await task.save();
        res.status(201).json(Response(false, "Task created successfully", newTask));
    } catch (err) {
        res.status(400).json(Response(true, "Error creating task", err.message));
    }
};

// update a task
const updateTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!task) {
            return res.status(404).json(Response(true, "Task not found"));
        }
        res.json(Response(false, "Task updated successfully", task));
    } catch (err) {
        res.status(400).json(Response(true, "Error updating task", err.message));
    }
};

// delete a task
const deleteTask = async (req, res) => {
    try {
        await Task.findByIdAndDelete(req.params.id);
        res.json(Response(false, "Task deleted successfully"));
    } catch (err) {
        res.status(500).json(Response(true, "Error deleting task", err.message));
    }
};

// update task status
const updateTaskStatus = async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
        res.json(Response(false, "Task status updated successfully", task));
    } catch (err) {
        res.status(400).json(Response(true, "Error updating task status", err.message));
    }
};

module.exports = {
    getAllTasks,
    createTask,
    updateTask,
    deleteTask,
    updateTaskStatus,
};