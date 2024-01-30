const express = require('express')
const adminRouter = express.Router()
const BlackPineAdmin = require("../models/blackPineAdmin.js")
const jwt = require('jsonwebtoken')

adminRouter.post('/signup', (req, res, next) => {
    BlackPineAdmin.findOne({username: req.body.username}, (err, user) => {
        if(err){
            res.status(500)
            return next(err)
        }
        if(user){
            res.status(403)
            return next(new Error('Username is already taken'))
        }
        const newAdmin = new BlackPineAdmin(req.body)
        newAdmin.save((err, savedAdmin) => {
            if(err){
                res.status(500)
                return next(err)
            }
            const token = jwt.sign(savedAdmin.withoutPassword(), process.env.SECRET)
            return res.status(201).send({token, user: savedAdmin.withoutPassword()})
        })
    })
})

adminRouter.post('/login', (req, res, next) => {
    BlackPineAdmin.findOne({username: req.body.username, isAdmin: true}, (err, user) => {
        if(err){
            res.status(500)
            return next(err)
        }
        if(!user){
            res.status(403)
            return next(new Error('Incorrect Username or Password'))
        }

        user.checkPassword(req.body.password, (err, isMatch) => {
            if(err){
                res.status(500)
                return next(err)
            }
            if(!isMatch){
                res.status(403)
                return next(new Error('Incorrect Username or Password'))
            }
            const token = jwt.sign(user.withoutPassword(), process.env.SECRET)
            return res.status(200).send({token, user: user.withoutPassword()})
        })
    })
})

module.exports = adminRouter