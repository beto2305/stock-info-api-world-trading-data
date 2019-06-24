"use strict";

let apiFactory = require("../api/wtd"),
  responseFactory = require("../libs/response-factory").init(),
  requestValidator = require("./wtd-request-validator");

module.exports.init = function (app, logger) {
  logger.info("Initializing routes.");

  let api = apiFactory.init(app.get("config"), logger);

  // ***** Route test server on! *****
  app.all(["/", "/api", "/api/v1"], function (req, res) {
    res.json({
      core: "Middleware is on - " + app.get("config").api.name + "!",
      version: app.get("config").api.version,
      date: new Date()
    });
  });

  // GET method
  app.get(
    "/api/v1/wtd/start",
    requestValidator.validateApiStart(),
    api.startRoutine
  );
  app.get("/api/v1/wtd/stop", api.stopRoutine);
  app.get("/api/v1/wtd/status", api.routineStatus);

  app.get(
    "/api/v1/wtd/history",
    requestValidator.validateApiStockHistory(),
    api.stockHistory
  );

  /* Erro Handler express-joi-validation */
  app.use((err, req, res, next) => {
    if (err.error && typeof err.error.isJoi !== "undefined") {
      responseFactory.badRequest(req, res, err.error.toString(), logger);
    } else {
      // pass on to another error handler
      next(err);
    }
  });

  // catch requests for not mapped URLs
  app.use(function (req, res) {
    let msg =
      "The requested resource (" +
      req.originalUrl +
      ") with " +
      req.method +
      " method was not found";
    responseFactory.notFound(req, res, "URL not found", msg, logger);
  });

  return this;
};
