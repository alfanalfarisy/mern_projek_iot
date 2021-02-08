const mongoose = require('mongoose');
const moment = require('moment');
const scheduleValidator = require('../validation/schedules/input')
const {Schedule} = require('../models/rootModels')

exports.getSchedule = (req, res) =>{
    Schedule.find({}).then((schedules)=>{
        res.status(200).json(schedules)
    })
}

exports.inputSchedule = (req, res) =>{
    const {errors,isValid}  = scheduleValidator(req.body)
    const id = `${req.body.userName}${req.body.idVisit}`

    if (!isValid){
        return res.status(422).json(errors)
    }
    const newSchedule = new Schedule ({
        dataVisit:{ 
            id : id,
            session : 1,
        },
        userName : req.body.userName,
        doctor : req.body.doctor,
        datetime : req.body.datetime,
        location : req.body.location,
        report : req.body.report,
    })

    newSchedule.save()
    .then(() =>{
        return res.status(200).json({newSchedule: newSchedule})
        })
    .catch(err => {
        console.log(err)
        return res.status(422).json(err)
    })
}

//get new schedule with same report
exports.updateSchedule = (req, res) =>{
    const {errors,isValid}  = scheduleValidator(req.body)
    const id = `${req.body.userName}${req.body.idVisit}`

    if(!isValid){
        res.status(422).json(errors)
    }
    Schedule.findOne({'dataVisit.id':id})
    .then((schedule) =>{
        console.log(schedule)
        const session = schedule.dataVisit.session + 1 
        const newSchedule = new Schedule ({
            dataVisit:{ 
                id : id,
                session : session,
                done : false
            },
            userName : req.body.userName,
            doctor : req.body.doctor,
            datetime : req.body.datetime,
            location : req.body.location,
            report : req.body.report,
        })
        newSchedule.save()
        .then(() =>{
            return res.status(200).json({newSchedule: newSchedule})
            })
        .catch(err => console.log(err))
    
    })
    .catch(err =>console.log(err))

}
