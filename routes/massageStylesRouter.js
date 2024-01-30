const express = require('express')
const massageStylesRouter = express.Router()
const MassageStyles = require("../models/massageStyles.js")


massageStylesRouter.get("/", (req, res, next) => {
    MassageStyles.find((err, massageStyle) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(massageStyle)
    })
})


massageStylesRouter.post("/", (req, res, next) => {
    const newMassage = new MassageStyles(req.body)
    newMassage.save((err, newMassage) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(201).send(newMassage)
    })
})

massageStylesRouter.put("/:massageID", (req, res, next) => {
    MassageStyles.findOneAndUpdate(
        {_id: req.params.massageID},
        req.body,
        {new: true},
        (err, updatedMassage) => {
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(201).send(updatedMassage)
        }
    )
})

massageStylesRouter.delete("/:massageID", (req, res, next) => {
    MassageStyles.findOneAndDelete(
        {_id: req.params.massageID},
        (err, deletedMassage) => {
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(200).send(`Succesfully deleted ${deletedMassage.title} from database`)
        } 
        )
})

module.exports = massageStylesRouter