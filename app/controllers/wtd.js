"use strict";

let apiWtdFct = require("../external/api-get-wtd-stock-history"),
  dateFormat = require("dateformat");

module.exports.init = function(config, logger) {
  logger.info("Initializing controller.");

  // initialize external endpoints
  let apiWtd = apiWtdFct.init(config, logger);

  let controller = {
    //
    startRoutine: async (stock, searchList) => {
      logger.debug("controller.wtd - startRoutine");
    },

    //
    stopRoutine: () => {
      logger.debug("controller.wtd - stopRoutine");

      return "stopRoutine";
    },

    //
    routineStatus: () => {
      logger.debug("controller.wtd - routineStatus");

      return "routineStatus";
    },

    //
    getStockValues: async (symbol, dateFrom, dateTo) => {
      logger.debug("controller.wtd - getStockValues");

      // get api results
      let apiResult = await apiWtd.getStockValues(
        symbol,
        dateFormat(dateFrom, "yyyy-mm-dd"),
        dateFormat(dateTo, "yyyy-mm-dd")
      );

      //
      let formatedResult = { symbol: symbol, history: [] };

      // correct api original format, correct array notation
      for (let date in apiResult.history) {
        let dateEntry = { date: date, info: apiResult.history[date] };

        formatedResult.history.push(dateEntry);
      }

      return formatedResult;
    }
  };

  return controller;
};
