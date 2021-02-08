const mongoose = require('mongoose');
const moment = require('moment');
const {Klinik} = require('../models/rootModels')
const klinikValidator = require('../validation/kliniks/input')

exports.list = (req,res) => {
    Klinik.find({})
    .then(kliniks =>{
        return res.json(kliniks)
    })
    .catch(err =>console.log(err))
}

exports.input = (req,res) => {

    const {errors, isValid} = klinikValidator(req.body)

    if(!isValid){
        return res.status(400).json(errors);
    }else{

        const {id,name,owner,lat,lng} = req.body
        Klinik.findOne({name})
        .then(klinik =>{
            if(klinik){
                return res.status(200).json('klinik telah tersedia')
            }else{
                const newKlinik = new Klinik({
                    id : id,
                    name : name,
                    owner : owner,
                    loc : [lat,lng]
                })
                newKlinik.save()
                .then(() => {
                    return res.status(200).json('input sukses')
                })
                .catch(err =>console.log(err))
            }
        })
        .catch(err =>console.log(err))
    }
}
