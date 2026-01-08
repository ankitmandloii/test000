const Task = require('../model/task.model');

// Create Task
exports.createTask = async (req, res) => {
  const { taskName, descriptionTask } = req.body;

  if (!taskName || !descriptionTask) {
    console.error('Task name and description are required');
    return;
  }

  try {
    console.log(req.user.id)
    const newTask = new Task({
      taskName,
      descriptionTask,
      taskCreatedBy: req.user.id, // Ensure this is set by the JWT Middleware
    });

    await newTask.save();
    res.status(201).json(newTask);  // Status 201 is used for successful creation
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Tasks
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ taskCreatedBy: req.user.id });  // Get tasks created by logged-in user
    if (!tasks) {
      return res.status(404).json({ message: 'No tasks found', tasks: [] });
    }
    res.status(200).json({ tasks });
  } catch (error) {
    res.status(500).json({ message: 'Server error', tasks: [] });
  }
};

// Update Task
exports.updateTask = async (req, res) => {
  const { taskName, descriptionTask } = req.body;
  try {
    const task = await Task.findById(req.params.id);  // Fetch task by ID

    if (!task || task.taskCreatedBy.toString() !== req.user.id) {
      return res.status(404).json({ message: 'Task not found or not authorized' });
    }

    task.taskName = taskName || task.taskName;
    task.descriptionTask = descriptionTask || task.descriptionTask;

    await task.save();
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete Task
exports.deleteTask = async (req, res) => {
  try {

    if (!req.params.id) {
      return res.status(400).json({ message: 'Task ID is required' });
    }
    const task = await Task.findById(req.params.id);
    if (!task || task.taskCreatedBy.toString() !== req.user.id) {
      return res.status(404).json({ message: 'Task not found or not authorized' });
    }



    await Task.findByIdAndDelete(req.params.id);

    res.json({ message: 'Task removed' });
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ message: 'Server error' });
  }
};