const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

let todos = [
    { id: 1, title: 'Learn Node.js', completed: false },
    { id: 2, title: 'Build a CRUD app', completed: false }
];

// Get all todos
app.get('/todos', (req, res) => {
    res.json(todos);
});

// Get a specific todo
app.get('/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const todo = todos.find(todo => todo.id === id);
    if (!todo) {
        res.status(404).send('Todo not found');
    } else {
        res.json(todo);
    }
});

// Create a new todo
app.post('/todos', (req, res) => {
    const newTodo = req.body;
    todos.push(newTodo);
    res.status(201).send('Todo created successfully');
});

// Update a todo
app.put('/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const updatedTodo = req.body;
    todos = todos.map(todo => {
        if (todo.id === id) {
            return { ...todo, ...updatedTodo };
        }
        return todo;
    });
    res.send('Todo updated successfully');
});

// Delete a todo
app.delete('/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    todos = todos.filter(todo => todo.id !== id);
    res.send('Todo deleted successfully');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
