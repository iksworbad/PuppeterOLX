const { OLX, validate } = require("../models/OLX");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const request = require("request");
const fs = require("fs");
const App = require("../routes/OLX.ts")
//import {App} from '../routes/OLX.ts';


router.get("/", async (req, res) => {
  const OLXs = await OLX.find();
  if (!OLXs)
    return res
      .status(404)
      .send("Not found.");
  res.send(OLXs);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  try {
    const arr = await App(req.body.login, req.body.pass);
    
    // const OLXs = new OLX(arr);
    // await OLXs.save();
    res.send(arr);
  } catch (ex) {
    return res.status(404).send(ex + " Not found.");
  }
});

module.exports = router;
