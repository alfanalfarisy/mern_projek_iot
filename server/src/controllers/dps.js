const {Dps} = require('../models/rootModels');
const {DpsQueryByDate, DpsQueryBySiteAndDate} = require('../query/dps')
var moment = require('moment');

exports.dpsUpdates = function(req, res, next) {
    Promise.all([
      Dps.findOne({site:221}).sort({'dt': -1}),
      Dps.findOne({site:222}).sort({'dt': -1}),
      Dps.findOne({site:223}).sort({'dt': -1}),
      Dps.findOne({site:331}).sort({'dt': -1}),

    ])
    .then(results=>{
        const [ktlmp,dpk,mgr,stMetaData] = results;
        res.json({
            ktlmp,dpk,mgr,stMetaData})

    })
    .catch(err=>{
      console.error("Something went wrong",err);
    })
}

exports.getDpsByDate = function(req, res, next) {
  const startDate  = req.params.start  
  const endDate = req.params.end 
  DpsQueryByDate({startDate,endDate}).then((results)=>{
    return res.json(results)
  })
}

exports.getDpsBySiteAndDate = function(req, res, next) {
  const startDate  = req.params.start  
  const endDate = req.params.end 
  const reqSite =  req.params.site ||'ktlmp' 
  DpsQueryBySiteAndDate({startDate,endDate,reqSite}).then((results)=>{
    return res.json(results)
  })
}