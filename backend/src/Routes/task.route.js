const express = require('express');
const router = express.Router();
const taskController = require('../controllers/task.controller');

// Routes
router.get('/tasks', taskController.getAllTasks);
router.post('/create-task', taskController.createTask);
router.put('/update-task/:id', taskController.updateTask);
router.delete('/delete-task/:id', taskController.deleteTask);
router.patch('/update-status/:id/status', taskController.updateTaskStatus);

module.exports = router;
