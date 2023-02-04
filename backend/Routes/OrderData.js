const express = require("express");
const { Router } = require("express");
const Order = require("../models/Orders");
const router = require("./CreatUser");
var cors = require("cors");

router.post("/OrderData", async (req, res) => {
  let data = req.body.order_data;
  await data.splice(0, 0, { Order_date: req.body.order_date });
  console.log("1231242343242354", req.body.email);

  //if email not exisitng in db then create: else: InsertMany()
  let eId = await Order.findOne({ email: req.body.email });
  console.log(eId);
  if (eId === null) {
    try {
      console.log(data);
      console.log("1231242343242354", req.body.email);
      await Order.create({
        email: req.body.email,
        order_data: [data],
      }).then(() => {
        return res.json({ success: true });
      });
    } catch (error) {
      console.log(error.message);
      return res.json(500).send(error.message);
    }
  } else {
    try {
      await Order.findOneAndUpdate(
        { email: req.body.email },
        { $push: { order_data: data } }
      ).then(() => {
        return res.json({ success: true });
      });
    } catch (error) {
      console.log(error.message);
      return res.json(500).send(error.message);
    }
  }
});
module.exports = router;
