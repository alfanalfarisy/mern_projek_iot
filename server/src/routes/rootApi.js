const express = require("express");
const router = express.Router();

const dps = require("./api/dps");
const users = require("./api/users");
const klinik = require("./api/klinik");
const site = require("./api/site");

module.exports = {dps, users, klinik, site}