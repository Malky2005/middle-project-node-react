require('dotenv').config()
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const corsOptions = require('./config/corsOptions')
const connectDB = require('./config/dbconn')

const app = express()
const PORT = process.env.PORT || 8008

connectDB()
app.use(cors(corsOptions))
app.use(express.json())
app.use(express.static('public'))

app.use("/api/users",require("./routes/userRoutes"))
app.use("/api/posts",require("./routes/postRoutes"))
app.use("/api/todos",require("./routes/todoRoutes"))
app.use("/api/photos",require("./routes/photoRoutes"))

mongoose.connection.once('open', ()=>{
    console.log('Connected to mongoDB')
    app.listen(PORT, ()=>{
        console.log(`server running on port ${PORT}`)
    })
})

mongoose.connection.on('error', err=>{
    console.log(err)
})