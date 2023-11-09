// routes/tasks.js
const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM tasks');
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/', async (req, res) => {
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

router.put('/:id', async (req, res) => {
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
 