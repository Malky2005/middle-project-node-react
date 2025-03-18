const express = require('express')
const router = express.Router()

const todoController = require('../controllers/TodoController')

router.get("/",todoController.getAllTodos)
router.get("/:id",todoController.getTodoById)
router.post("/",todoController.addNewTodo)
router.put("/",todoController.UpdateTodo)
router.put("/complete/:id",todoController.updateTodoComplete)
router.delete("/:id",todoController.deleteTodo)

module.exports = router