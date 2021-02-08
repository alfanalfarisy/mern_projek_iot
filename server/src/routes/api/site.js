const express = require ('express')
const router = express.Router();
const {Site} = require('../../models/rootModels');
const siteController = require('../../controllers/site')

router.get('/list',siteController.list)

router.post('/input',siteController.input)

module.exports = router;