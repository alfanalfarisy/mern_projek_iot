const {Site} = require('../models/rootModels')
const siteValidator = require('../validation/site/input')

exports.list = (req,res) => {
    Site.find({})
    .then(sites =>{
        return res.json(sites)
    })
    .catch(err =>console.log(err))
}

exports.input = (req,res) => {

    const {errors, isValid} = siteValidator(req.body)

    if(!isValid){
        return res.status(400).json(errors);
    }else{

        const {id,name,address,lat,lng} = req.body
        Site.findOne({id})
        .then(site =>{
            if(site){
                return res.status(422).json({message:'Site telah tersedia'})
            }else{
                const newSite = new Site({
                    id : id,
                    name : name,
                    address : address,
                    loc : [lat,lng]
                })
                newSite.save()
                .then(() => {
                    return res.status(200).json({message:'input sukses'})
                })
                .catch(err =>console.log(err))
            }
        })
        .catch(err =>console.log(err))
    }
}
