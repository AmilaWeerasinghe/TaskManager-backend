// index.js
const express = require('express');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 5001;
const taskRoutes = require('./routes/tasks');

app.use(cors());
app.use(express.json());
app.use('/tasks', taskRoutes);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
