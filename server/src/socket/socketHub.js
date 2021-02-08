const express = require('express');
const router = express.Router();
const moment = require('moment');

const {Dps} = require('../models/rootModels');
const {DpsQueryBySiteAndDateLast} = require('../query/dps');



function socket(io){
   	io.on('connection', function(socket){
		const sessionID = socket.id;
		console.log(sessionID); 
		console.log('a user connected');
		
		let reqSite = 'ktlmp'
		const site = {
			ktlmp: 221,
			dpk: 222,
			mgr : 223,
			wwr : 331
		}
		console.log(site.reqSite)
		const DpsMainStream = Dps.watch([
			{
			  "$match": {
				"operationType": {
				  "$in": [
					"insert"
				  ]
				},
				"fullDocument.site": 221
				
			  }
			}
		  ]);
		
		
		// socket.on('dpsReq', (msg)=>{
		// 	DpsQueryByDate().then((response)=>{
		// 		// console.log('response');
		// 		socket.emit('dpsData',{data: response})
		// 	})
        // })
		// DpsMainStream.on('change', (change) => {
		// 	SocketServ.newestDps(socket)
		// 	Promise.all([
	    //         DpsMain.findOne({'site':stSite,'tma.1':1000}).sort({'dt': -1}).lean(),
	    //         DpsMain.findOne({'site':stSite,'vair.1':1000}).sort({'dt': -1}).lean(),
	    //         DpsMain.findOne({'site':stSite,'ch.1':1000}).sort({'dt': -1}).lean(),
	    //     ]).then(result=>{
	    //         [tma,vair,ch]=result
	    //         sttsData={
	    //             'tma' : tma,
	    //             'vair' : vair,
	    //             'ch' : ch
	    //         }
	    //         socket.emit('sttsValidData',sttsData)
	    //     })
        // });
        socket.on('reqDps',(msg)=>{
            console.log(msg)
		})

		DpsMainStream.on('change', (change) => {
			DpsQueryBySiteAndDateLast({reqSite:reqSite}).then((response)=>{
				socket.emit('dpsUpdateByReqSite',{data: response.result})
				
			})
			console.log('emitted')
		});
	});

}	

module.exports = {
  router: router,
  sck: socket
}