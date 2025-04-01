import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Checkbox,
  Paper,
  Box,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

function App() {
  const [todos, setTodos] = useState([]);
  const [personName, setPersonName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get(`${API_URL}/todos`);
      setTodos(response.data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!personName.trim() || !taskDescription.trim()) return;

    try {
      await axios.post(`${API_URL}/todos`, {
        person_name: personName,
        task_description: taskDescription,
      });
      setPersonName('');
      setTaskDescription('');
      fetchTodos();
    } catch (error) {
      console.error('Error creating todo:', error);
    }
  };

  const handleToggleComplete = async (id, completed) => {
    try {
      await axios.put(`${API_URL}/todos/${id}`, { completed: !completed });
      fetchTodos();
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/todos/${id}`);
      fetchTodos();
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        Todo Application
      </Typography>

      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <form onSubmit={handleSubmit}>
          <Box sx={{ display: 'flex', gap: 2, flexDirection: 'column' }}>
            <TextField
              label="Person Name"
              value={personName}
              onChange={(e) => setPersonName(e.target.value)}
              fullWidth
              required
            />
            <TextField
              label="Task Description"
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
              fullWidth
              required
              multiline
              rows={2}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              size="large"
            >
              Add Todo
            </Button>
          </Box>
        </form>
      </Paper>

      <Paper elevation={3} sx={{ p: 3 }}>
        <List>
          {todos.map((todo) => (
            <ListItem
              key={todo.id}
              divider
              sx={{
                textDecoration: todo.completed ? 'line-through' : 'none',
                color: todo.completed ? 'text.secondary' : 'text.primary',
              }}
            >
              <Checkbox
                checked={todo.completed}
                onChange={() => handleToggleComplete(todo.id, todo.completed)}
                color="primary"
              />
              <ListItemText
                primary={todo.person_name}
                secondary={todo.task_description}
              />
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => handleDelete(todo.id)}
                >
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Paper>
    </Container>
  );
}

export default App; 