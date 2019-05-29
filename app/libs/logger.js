"use strict";

let winston = require("winston"),
  os = require("os"),
  hostname = os.hostname(),
  env = process.env.NODE_ENV || "development";

module.exports.init = function(config) {
  let transports = [
    new (require("winston-daily-rotate-file"))({
      silent: false /* true for disable log */,
      level: env === "development" ? "debug" : "info",
      filename: "./logs/" + hostname + ".log",
      datePattern: "YYYY-MM-DD",
      json: false,
      timestamp: true,
      maxSize: config.maxLogFileSize + "k",
      maxFiles: config.maxLogFiles
    })
  ];

  // enable console only on development mode
  if (env === "development") {
    transports.push(
      new winston.transports.Console({
        json: false,
        timestamp: true,
        colorize: true,
        level: "debug"
      })
    );
  }

  let logFactory = new winston.Logger({
    transports,
    exceptionHandlers: [
      new (require("winston-daily-rotate-file"))({
        filename: "./logs/" + hostname + ".exceptions.log",
        datePattern: "YYYY-MM-DD",
        json: false,
        timestamp: true,
        maxSize: config.log.maxLogFileSize,
        maxFiles: config.log.maxLogFiles
      })
    ],
    exitOnError: false
  });

  return logFactory;
};
