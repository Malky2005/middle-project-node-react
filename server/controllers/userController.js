const User = require('../models/User')

const getAllUsers = async (req,res)=>{
    const allUsers = await User.find().lean()
    allUsers.sort((a,b) => a._id - b._id)
    res.json(allUsers)
}

const getUserById = async (req,res)=>{
    const {id} = req.params
    const user = await User.findById(id).lean()
    if(!user){
        return res.status(400).send('no user found')
    }
    res.json(user)
}

const addNewUser = async (req,res)=>{
    const {name, username, email, address, phone} = req.body
    if(!name || !username){
        return res.status(400).send('name and username are required')
    }
    const existUser = await User.findOne({username}).lean()
    if(existUser){
        return res.status(409).send('username exists')
    }
    const user = await User.create({name, username, email, address, phone})
    if(user){
        return res.status(201).send('new user created')
    } else{
        return res.status(400).send('invalid user')
    }

}

const updateUser = async (req,res)=>{
    const {_id,name, username, email, address, phone} = req.body
    if(!_id || !name || !username){
        return res.status(400).send('fields are required')
    }
    const user = await User.findById(_id)
    if(!user){
        return res.status(400).send('no user found')
    }
    const existUser = await User.findOne({username}).lean()
    if(existUser && existUser._id != _id){
        return res.status(409).send('username exists')
    }
    user.name = name
    user.username = username
    user.email = email
    user.address = address
    user.phone = phone
    const updatedUser = await user.save()
    res.json(updatedUser)
}

const deleteUser = async(req,res)=>{
    const {id} = req.body
    if(!id){
        return res.status(400).send('id is requried')
    }
    const user = await User.findById(id)
    if(!user){
        return res.status(400).send('no user found')
    }
    const result = await user.deleteOne()
    res.json(result)
}

module.exports = {
    getAllUsers,
    getUserById,
    addNewUser,
    updateUser,
    deleteUser
}