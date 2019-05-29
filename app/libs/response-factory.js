"use strict";


module.exports.init = function (logger) {
    
    let responseFactory = {
        // HTTP 1.1 / 200
        ok: (req, res, msg, logger) => {
            let
                status = {
                    'code': '200',
                    'message': msg
                };

            logger.debug('Response - OK: ' + JSON.stringify(status));

            res.status(200).json(status);

        },

        // HTTP 1.1 / 400
        badRequest: (req, res, msg, logger) => {
            let
                status = {
                    'code': 400,
                    'error': 'Parâmetros de entrada inválidos',
                    'message': msg
                };

            logger.debug('Response - notFound: ' + JSON.stringify(status));

            res.status(400).json(status);
        },

        // HTTP 1.1 / 404
        notFound: (req, res, err, msg, logger) => {
            let
                status = {
                    'code': 404,
                    'error': err,
                    'message': msg && msg !== 'undefined' ? msg : 'O recurso procurado não foi encontrado'
                };

            logger.debug('Response - notFound: ' + JSON.stringify(status));

            res.status(404).json(status);
        },

        // HTTP 1.1 / 500
        serverError: (req, res, error, logger) => {
            let
                status = {
                    'code': '500',
                    'error': 'Erro inesperado!',
                    'message': error.message
                };

            logger.debug('Response - serverError: ' + JSON.stringify(status));
            logger.error(error);
            if (res._headerSent === false) {
                res.status(500).json(status);
            }
        }

    }
    return responseFactory;
}