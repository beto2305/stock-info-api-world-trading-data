"use strict";

let validator = require("express-joi-validation")({
    passError: true
  }),
  BaseJoi = require("joi"),
  Extension = require("joi-date-extensions"),
  Joi = BaseJoi.extend(Extension);

exports.validateApiStart = function() {
  let payload = Joi.object({
    start_date: Joi.date().required()
  });

  return validator.query(payload);
};

exports.validateApiStockHistory = function() {
  let payload = Joi.object({
    symbol: Joi.string()
      .regex(/[A-Z]+/)
      .min(5)
      .max(9)
      .required(),
    date_from: Joi.date().required(),
    date_to: Joi.date().required()
  });

  return validator.query(payload);
};
