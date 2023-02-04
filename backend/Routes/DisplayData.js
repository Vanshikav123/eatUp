const express = require("express");
const { Router } = require("express");
const router = require("./CreatUser");
const Order = require("../models/Orders");
var cors = require("cors");

router.post("/foodData", (req, res) => {
  try {
    res.send([global.food_items, global.food_category]);
  } catch (error) {
    console.error(error.message);
    res.send("Server Error");
  }
});
module.exports = router;
