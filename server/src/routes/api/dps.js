const express = require ('express')
const router = express.Router();
const dpsController = require('../../controllers/dps')
const mongoose = require('mongoose');

router.get('/dps-update', dpsController.dpsUpdates)
router.get('/bysite&date/:site?/:start?/:end', dpsController.getDpsBySiteAndDate)
router.get('/bydate/:start?/:end?', dpsController.getDpsByDate)


module.exports = router;