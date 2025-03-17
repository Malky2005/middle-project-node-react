const mongoose  = require('mongoose')

const photoSchema = new mongoose.Schema({
    title:{
        Type:String
    },
    imageUrl:{
        type:String,
        required:true,
        unique:true
    }
},{
    timestamps:true
})

module.exports = mongoose.model('Photo',photoSchema)