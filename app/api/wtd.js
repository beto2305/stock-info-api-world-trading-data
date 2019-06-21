"use strict";

let responseFactory = require("../libs/response-factory").init(),
  helloControllerFactory = require("../controllers/wtd");

module.exports.init = function (config, logger) {
  logger.info("Initializing APIs.");

  let controller = helloControllerFactory.init(config, logger);

  let api = {
    //
    startRoutine: async (req, res) => {
      logger.debug("api.wtd.startRoutine - req method: " + req.method);
      try {

        let result = await controller.startRoutine()

        return responseFactory.ok(req, res, result, logger);
      } catch (error) {
        return responseFactory.serverError(req, res, error, logger);
      }
    },

    stopRoutine: (req, res) => {
      logger.debug("api.wtd.stopRoutine - req method: " + req.method);
      try {
        console.log(controller.stopRoutine());

        return responseFactory.ok(req, res, "stopRoutine", logger);
      } catch (error) {
        return responseFactory.serverError(req, res, error, logger);
      }
    },

    routineStatus: (req, res) => {
      logger.debug("api.wtd.routineStatus - req method: " + req.method);
      try {
        console.log(controller.routineStatus());

        return responseFactory.ok(req, res, "routineStatus", logger);
      } catch (error) {
        return responseFactory.serverError(req, res, error, logger);
      }
    },

    history: async (req, res) => {
      logger.debug("api.wtd.history - req method: " + req.method);
      try {
        let result = await controller.getStockValues(
          req.query.symbol,
          req.query.date_from,
          req.query.date_to
        );

        if (null !== result && null !== result.message) {
          return responseFactory.notFound(req, res, result.message, logger)
        }

        return responseFactory.ok(req, res, result, logger);
      } catch (error) {
        return responseFactory.serverError(req, res, error, logger);
      }
    }
  };
  return api;
};
