"use strict";

let mongoose = require("mongoose");

module.exports.close = function() {
  console.log("close");
};
module.exports.init = function(config, logger) {
  logger.info("Initializing database connection");

  let uri =
    "mongodb://" +
    config.database.dbUser +
    ":" +
    config.database.dbPwd +
    "@" +
    config.database.host +
    ":" +
    config.database.port +
    "/" +
    config.database.dbName;

  //Resolve error mongoose mpromise (mongoose's default promise library) is deprecated
  logger.debug("database URI: " + uri);

  mongoose.Promise = global.Promise;
  mongoose.connect(uri, { useNewUrlParser: true });

  mongoose.connection.on("connected", function() {
    logger.debug("Conectado ao MongoDB");
  });

  mongoose.connection.on("error", function(error) {
    logger.debug("Erro na conexão: " + error);
  });

  mongoose.connection.on("disconnected", function() {
    logger.debug("Desconectado do MongoDB");
  });

  process.on("SIGINT", function() {
    mongoose.connection.close(function() {
      logger.debug("Aplicação terminada, conexão fechada");
      process.exit(0);
    });
  });
};
