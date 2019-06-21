"use strict";

let axios = require("axios");

module.exports.init = function (config, logger) {
  logger.info("Initializing external API: World Trading Data.");

  let handler = {

    // query World Trading Data API to get stock history for informed period
    getStockValues: async (symbol, dateFrom, dateTo) => {
      logger.debug("controller.wtd - getStockValues");

      let apiUri =
        config.wtd.api +
        "&symbol=" +
        symbol +
        "&date_from=" +
        dateFrom +
        "&date_to=" +
        dateTo;

      return new Promise((resolve, reject) => {
        axios
          .get(apiUri)
          .then(response => {
            resolve(response.data);
          })
          .catch(error => {
            reject(error);
          });
      });
    }
  };

  return handler;
};
