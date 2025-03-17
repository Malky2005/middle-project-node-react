const Photo = require('../models/Photo')

const getAllPhotos = async(req,res)=>{
    const allPhotos = await Photo.find().lean()
    res.send(allPhotos)
}

const getPhotoById = async(req,res)=>{
    const {id} = req.params
    const photo = await Photo.findById(id).lean()
    if(!photo){
        return res.status(400).send('no photo found')
    }
    res.json(photo)
}

const addNewPhoto = async(req,res)=>{
    const {title,imageUrl} = req.body
    if(!imageUrl){
        return res.status(400).send('imageUrl is required')
    }
    const existPhoto = await Photo.findOne({imageUrl}).lean()
    if(existPhoto){
        return res.status(409).send('imageUrl exists')
    }
    const photo = await Photo.create({title,imageUrl})
    if(photo){
        return res.status(201).send('new photo created')
    } else{
        return res.status(400).send('invalid user')
    }
}

const updatePhoto = async(req,res)=>{
    const {_id,title,imageUrl} = req.body
    if(!_id || !imageUrl){
        return res.status(400).send('fields are required')
    }
    const photo = await Photo.findById(id)
    if(!photo){
        return res.status(400).send('no photo found')
    }
    const existPhoto = await Photo.findOne({imageUrl}).lean()
    if(existPhoto && existPhoto._id != _id){
        return res.status(409).send('imageUrl exists')
    }
    photo.title = title
    photo.imageUrl = imageUrl
    const updatedPhoto = await photo.save()
    return res.json(updatedPhoto)
}

const deletePhoto = async(req,res)=>{
    const {id} = req.body
    if(!id){
        return res.status(400).send('id is requried')
    }
    const photo = await Photo.findById(id)
    if(!photo){
        return res.status(400).send('no photo found')
    }
    const result = await photo.deleteOne()
    res.json(result)
}

module.exports = {
    getAllPhotos,
    getPhotoById,
    addNewPhoto,
    updatePhoto,
    deletePhoto
}