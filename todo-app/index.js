const express = require("express")
const app = express();
const port = 3000;

const todos= [];
app.use(express.json())

app.get("/:todo", function(req, res){
        const userTodo = req.params.todo;
        todos.push({todoName:userTodo});
        res.send(`my task: ${todos.map(todo => todo.todoName).join(",")}`)
})

app.post("/add", (req, res) => {
    const userTodo = req.body.userTodo;
    if (!userTodo) {
        return res.status(400).send("Invalid task.");
    }
    todos.push({todoName:userTodo});
    res.send(`My tasks: ${todos.map(todo=> todo.todoName).join(", ")}`);
});

app.put("/:index", function(req, res){    
    const index = parseInt(req.params.index)
    const newTodoName = req.body.newTodoName;
    todos[index].todoName = newTodoName
    res.send(`Task at index ${index} updated to ${newTodoName}. My task: ${todos.map(todo=> todo.todoName).join(",")}`)
})

app.delete("/:index", function(req, res){
    const index = parseInt(req.params.index)
    const deletedTodo= todos.splice(index, 1);
    res.send(`Task at index ${index} deleted ${deletedTodo[0].todoName} successfully. My task: ${todos.map(todo=> todo.todoName).join(",")}`)
})


app.listen(port);