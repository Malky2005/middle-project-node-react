const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        lowercase:true,
        trim:true
    },
    address:{
        street:String,
        city:String,
        building:Number
    },
    phone:{
        type:String,
        trim:true
    }
},{
    timestamps:true
})

module.exports = mongoose.model('User',userSchema)