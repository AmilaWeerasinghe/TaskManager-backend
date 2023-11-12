const express = require('express');
const router = express.Router();
const db = require('../db');

// Validation middleware
const validateTaskFields = (req, res, next) => {
  const { title, description, priority, status } = req.body;

  if (!title) {
    return res.status(400).json({ error: 'Title is a required field' });
  }
  if (!description) {
    return res.status(400).json({ error: 'Description is a required field' });
  }
  if (!priority) {
    return res.status(400).json({ error: 'Priority is a required field' });
  }
  if (!status) {
    return res.status(400).json({ error: 'Status is a required field' });
  }

  next();
};

router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM tasks');
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/', validateTaskFields, async (req, res) => {
  const { title, description, priority, status } = req.body;

  try {
    await db.query('INSERT INTO tasks (title, description, priority, status) VALUES (?, ?, ?, ?)', [
      title,
      description,
      priority,
      status,
    ]);
    res.json({ message: 'Task added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.put('/:id', validateTaskFields, async (req, res) => {
  const { title, description, priority, status } = req.body;
  const taskId = req.params.id;

  try {
    await db.query(
      'UPDATE tasks SET title=?, description=?, priority=?, status=? WHERE id=?',
      [title, description, priority, status, taskId]
    );
    res.json({ message: 'Task updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.delete('/:id', async (req, res) => {
  const taskId = req.params.id;

  try {
    await db.query('DELETE FROM tasks WHERE id=?', [taskId]);
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
