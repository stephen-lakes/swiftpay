const express = require("express").Router();

const { sendMoney } = require("../controllers/sendMoney.controller");

router.post("/", sendMoney);

module.exports = router;
