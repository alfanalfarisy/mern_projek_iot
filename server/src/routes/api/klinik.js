const express = require("express");
const router = express.Router();
const klinikController = require("../../controllers/klinik");
const scheduleController = require("../../controllers/schedule");


router.get("/list", klinikController.list);
router.post("/input", klinikController.input);
router.get("/list_schedule", scheduleController.getSchedule);
router.post("/schedule", scheduleController.inputSchedule);
router.post("/update_schedule", scheduleController.updateSchedule);



module.exports = router;