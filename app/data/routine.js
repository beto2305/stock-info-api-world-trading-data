const mongoose = require('mongoose');
let RoutineModel = require('../model/routine')
mongoose.Promise = global.Promise;

module.exports.init = function (logger) {
  //const Routine = () => {

  return {

    createRoutine: async (routineToCreate) => {
      try {
        return new Promise((resolve, reject) => {
          RoutineModel.create(routineToCreate).then((routine, err) => {
            if (err) {
              reject(err)
            } else {
              resolve(routine)
            }


          }, (error) => {
            reject(error)
          });

        });

      } catch (exception) {
        throw (exception);
      }

    }

  };
};

