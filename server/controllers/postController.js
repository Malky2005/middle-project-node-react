const Post = require('../models/Post')

const getAllPosts = async(req,res)=>{
    const allPosts = await Post.find().lean().sort({title:1})
    allPosts.sort((a,b) => a._id - b._id)
    res.json(allPosts)
}

const getPostById = async(req,res)=>{
    const {id} = req.params
    const post = await Post.findById(_id).lean()
    if(!post){
        return res.status(400).send('no post found')
    }
    res.json(post)
}

const addNewPost = async(req,res)=>{
    const{title,body} = req.body
    if(!title){
        res.status(400).send('title is required')
    }
    const existPost = await Post.findOne({title}).lean()
    if(existPost){
        return res.status(409).send('title exists')
    }
    const post = await Post.create({title,body})
    if(post){
        return res.status(201).send('new post created')
    } else{
        return res.status(400).send('invalid post')
    }
}

const updatePost = async(req,res)=>{
    const {_id,title,body} = req.body
    if(!_id || !title){
        res.status(400).send('fields are required')
    }
    const existPost = await Post.findOne({title}).lean()
    if(existPost && existPost._id!= _id){
        return res.status(409).send('title exists')
    }
    const post = await Post.findById(_id)
    if(!post){
        return res.status(400).send('no post found')
    }
    post.title = title
    post.body = body
    const updetedPost = await post.save()
    res.json(updetedPost)
}

const deletePost = async(req,res)=>{
    const {id} = req.params
    if(!id){
        return res.status(400).send('id is requried')
    }
    const post = await Post.findById(id)
    if(!post){
        return res.status(400).send('no post found')
    }
    const result = await post.deleteOne()
    res.json(result)
}

module.exports = {
    getAllPosts,
    getPostById,
    addNewPost,
    updatePost,
    deletePost
}