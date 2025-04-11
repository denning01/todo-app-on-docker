const express = require('express');
const cors = require('cors');
const pool = require('./config/db.config');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// ✅ Root route (to avoid "Cannot GET /")
app.get('/', (req, res) => {
  res.send('Welcome to the Todo API. Use /api/todos to get tasks.');
});

// ✅ Create todos table if it doesn't exist
pool.query(`
  CREATE TABLE IF NOT EXISTS todos (
    id SERIAL PRIMARY KEY,
    person_name VARCHAR(100) NOT NULL,
    task_description TEXT NOT NULL,
    completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
`).then(() => {
  console.log('✅ todos table is ready.');
}).catch(err => {
  console.error('❌ Error creating todos table:', err.message);
});

// ✅ Get all todos
app.get('/api/todos', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM todos ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching todos:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// ✅ Create a new todo
app.post('/api/todos', async (req, res) => {
  const { person_name, task_description } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO todos (person_name, task_description) VALUES ($1, $2) RETURNING *',
      [person_name, task_description]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating todo:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// ✅ Update todo status
app.put('/api/todos/:id', async (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;
  try {
    const result = await pool.query(
      'UPDATE todos SET completed = $1 WHERE id = $2 RETURNING *',
      [completed, id]
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating todo:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// ✅ Delete a todo
app.delete('/api/todos/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM todos WHERE id = $1', [id]);
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting todo:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// ✅ Start server
app.listen(port, () => {
  console.log(`🚀 Server is running on http://localhost:${port}`);
});
