const express = require('express')
const servicesRouter = express.Router()
const Services = require("../models/services.js")


servicesRouter.get("/", (req, res, next) => {
    Services.find((err, services) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(services)
    })
})


servicesRouter.post("/", (req, res, next) => {
    const newService = new Services(req.body)
    newService.save((err, newService) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(201).send(newService)
    })
})

servicesRouter.put("/:serviceID", (req, res, next) => {
    Services.findOneAndUpdate(
        {_id: req.params.serviceID},
        req.body,
        {new: true},
        (err, updatedService) => {
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(201).send(updatedService)
        }
    )
})

servicesRouter.delete("/:serviceID", (req, res, next) => {
    Services.findOneAndDelete(
        {_id: req.params.serviceID},
        (err, deletedService) => {
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(200).send(`Succesfully deleted ${deletedService.title} from database`)
        } 
        )
})

module.exports = servicesRouter