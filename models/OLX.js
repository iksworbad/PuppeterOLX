const Joi = require('joi');
const mongoose = require('mongoose');

const OLX = mongoose.model('OLX', new mongoose.Schema({
  title: {
    type: 'string'
  },
  place: {
    type: 'string'
  },
  price: {
    type: 'string'
  },
  img: {
    type: 'string'
  },
  date:{
    type: 'string'
  }
  
}));


function validateOLX(OLX) {
  const schema = {
    login: Joi.string().required(),
    pass: Joi.string().required()
  };

  return Joi.validate(OLX, schema);
}

exports.OLX = OLX; 
exports.validate = validateOLX;