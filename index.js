// index.js
const express = require('express');
const app = express();
const PORT = process.env.PORT || 5001;
const taskRoutes = require('./routes/tasks');

app.use(express.json());
app.use('/tasks', taskRoutes);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
