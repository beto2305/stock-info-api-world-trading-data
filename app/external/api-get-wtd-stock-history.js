"use strict";

let axios = require("axios");

module.exports.init = function (config, logger) {
  logger.info("Initializing external API: World Trading Data.");

  let handler = {

    formatedReturn: (ifSuccess, messageToShow, dataToReturn, statusReturned) => {
      return {
        success: ifSuccess,
        message: messageToShow,
        data: dataToReturn,
        statusError: statusReturned
      };
    },

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
            if (response.data.message)
              reject(formatedReturn(false, response.data.message, null, 400));
            else if (response.data.Message) {
              let obj = formatedReturn(false, response.data.Message, null, 400)
              reject(obj);
            } else
              resolve(formatedReturn(true, response.data.Message, response.data, 200))
          })
          .catch(error => {
            reject(error);
          });
      });
    }
  };

  return handler;
};
