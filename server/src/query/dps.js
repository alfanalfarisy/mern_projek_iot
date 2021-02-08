const {Dps} = require('../models/rootModels');
var moment = require('moment');

const startToday  = () => {return moment().add(7,"hours").subtract(1,"days")}
const endToday = () => { return moment().add(7,"hours")}


module.exports.DpsQueryBySiteAndDate = function({startDate=startToday(), endDate=endToday(), reqSite}){
    // console.log(startToday,endToday)

    const site = {
        ktlmp : 221,
        mgr : 222,
        dpk : 223,
        wwr : 331,
    }
    return Promise.all([
        Dps.find({site:site[reqSite],'dt':{$lt:endDate,$gt:startDate}}).sort({'dt': -1}),
    ])
    .then(results=>{
        const [all] = results;
        return data = {all};
    })
    .catch(err=>{
        console.error("Something went wrong",err);
    })
}
module.exports.DpsQueryByDate = function({startDate = startToday(), endDate=endToday()}){
    
    return Promise.all([
        Dps.find({site:221,'dt':{$lt:endDate,$gt:startDate}}).sort({'dt': -1}),
        Dps.find({site:222,'dt':{$lt:endDate,$gt:startDate}}).sort({'dt': -1}),
        Dps.find({site:223,'dt':{$lt:endDate,$gt:startDate}}).sort({'dt': -1}),
        Dps.find({site:331,'dt':{$lt:endDate,$gt:startDate}}).sort({'dt': -1}),

    ])
    .then(results=>{
        const [ktlmp,dpk,mgr,wwr] = results;
        return data = {ktlmp,dpk,mgr,wwr};
    })
    .catch(err=>{
        console.error("Something went wrong",err);
    })
}  

module.exports.DpsQueryBySiteAndDateLast = function({startDate=startToday(), endDate=endToday(), reqSite}){

    const site = {
        ktlmp : 221,
        mgr : 222,
        dpk : 223,
        wwr : 331,
    }
    return Promise.all([
        Dps.find({site:site[reqSite],'dt':{$lt:endDate,$gt:startDate}}).sort({'dt': -1}).limit(1),
    ])
    .then(results=>{
        const [result] = results
        // console.log(result)
        return data = {result};
    })
    .catch(err=>{
        console.error("Something went wrong",err);
    })
}
