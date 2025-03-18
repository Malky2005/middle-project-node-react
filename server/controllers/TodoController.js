const Todo = require('../models/Todo')

const getAllTodos = async (req,res) =>{
    const allTodos = await Todo.find().lean()
    res.json(allTodos)
}

const getTodoById = async (req,res) =>{
    const {id} = req.params
    const todo = await Todo.findById(id).lean()
    if(!todo){
        return res.status(400).send('no todo found')
    }
    res.json(todo)
}

const addNewTodo = async (req,res) =>{
    const {title,tags,completed} = req.body
    if(!title){
        return res.status(400).send('title is required')
    }
    const existTodo = await User.findOne({title}).lean()
    if(existTodo){
        return res.status(409).send('title exists')
    }
    const todo = await Todo.create({title,tags,completed})
    if(todo){
        return res.status(201).send('new todo created')
    } else{
        return res.status(400).send('invalid todo')
    }
}

const UpdateTodo = async (req,res) =>{
    const {_id,title,tags,completed} = req.body
    if(!_id || !title){
        return res.status(400).send('fields are required')
    }
    const existTodo = await User.findOne({title}).lean()
    if(existTodo && existTodo._id != _id){
        return res.status(409).send('title exists')
    }
    const todo = await Todo.findById(_id)
    if(!todo){
        return res.status(400).send('no todo found')
    }
    todo.title = title
    todo.tags = tags
    todo.completed = completed
    const updatedTodo = await todo.save()
    res.json(updatedTodo)
}

const updateTodoComplete = async (req,res) =>{
    const {id} = req.params
    const todo = await Todo.findById(id)
    if(!todo){
        return res.status(400).send('no todo found')
    }
    todo.completed = !todo.completed
    const updatedTodo = await todo.save()
    res.json(updatedTodo)
}

const deleteTodo = async (req,res) =>{
    const {id} = req.params
    if(!id){
        return res.status(400).send('id is requried')
    }
    const todo = await Todo.findById(id)
    if(!todo){
        return res.status(400).send('no todo found')
    }
    const result = await todo.deleteOne()
    res.json(result)
}

module.exports = {
    getAllTodos,
    getTodoById,
    addNewTodo,
    UpdateTodo,
    updateTodoComplete,
    deleteTodo
}