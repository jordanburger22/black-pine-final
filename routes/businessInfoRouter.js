const express = require('express')
const businessInfoRouter = express.Router()
const businessInfo = require("../models/businessInfo.js")


businessInfoRouter.get("/", (req, res, next) => {
    businessInfo.find((err, businessInfo) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(businessInfo)
    })
})


businessInfoRouter.post("/", (req, res, next) => {
    const newInfo = new businessInfo(req.body)
    newInfo.save((err, newInfo) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(201).send(newInfo)
    })
})

businessInfoRouter.put("/:infoID", (req, res, next) => {
    businessInfo.findOneAndUpdate(
        {_id: req.params.infoID},
        req.body,
        {new: true},
        (err, updatedInfo) => {
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(201).send(updatedInfo)
        }
    )
})

businessInfoRouter.delete("/:infoID", (req, res, next) => {
    businessInfo.findOneAndDelete(
        {_id: req.params.infoID},
        (err, deletedInfo) => {
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(200).send(`Succesfully deleted from database`)
        } 
        )
})

module.exports = businessInfoRouter