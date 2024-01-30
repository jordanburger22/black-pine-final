const express = require('express')
const app = express()
const morgan = require('morgan')
const mongoose = require('mongoose')
require('dotenv').config()
const {expressjwt} = require('express-jwt')
const path = require('path')


app.use(express.json())
app.use(morgan('dev'))
app.use(express.static(path.join(__dirname, "client", "dist")));
mongoose.set('strictQuery', true)
mongoose.connect(process.env.MONGO_URI, () => console.log('connected to database'))


app.use('/api/services', require('./routes/serviceRouter'))
app.use('/api/businessinfo', require('./routes/businessInfoRouter.js'))
app.use('/api/massagestyles', require('./routes/massageStylesRouter.js'))
app.use('/api/admin', require('./routes/adminRouter.js'))



app.use((err, req, res, next) => {
    console.log(err)
    if(err.name === 'UnauthorizedError'){
        res.status(err.status)
    }
    return res.send({errMsg: err.message})
})

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "dist", "index.html")); // middleware for deployment // dist for vite
  });

app.listen(5550, () => {
    console.log('server is running on port 5550')
})