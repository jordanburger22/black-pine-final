const express = require('express')
const app = express()
const morgan = require('morgan')
const mongoose = require('mongoose')
require('dotenv').config()
const {expressjwt} = require('express-jwt')


app.use(express.json())
app.use(morgan('dev'))

mongoose.set('strictQuery', true)
mongoose.connect("mongodb+srv://jordanburger22:.5HC5.FQHsqYVz8@cluster0.cihycu0.mongodb.net/test", () => console.log('connected to database'))


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



app.listen(5550, () => {
    console.log('server is running on port 5550')
})