'use strict';

let 
    Register = require('prom-client').register,  
    Counter = require('prom-client').Counter,  
    Histogram = require('prom-client').Histogram,  
    Summary = require('prom-client').Summary,  
    ResponseTime = require('response-time');


module.exports.init = function (app,logger) {

    logger.info("Initializing prometheus.")

    /**
    * A Prometheus counter that counts the invocations of the different HTTP verbs
    * e.g. a GET and a POST call will be counted as 2 different calls
    */
    let numOfRequests = new Counter({
        name: 'numOfRequests',
        help: 'Number of requests made',
        labelNames: ['method']
    });

    /**
    * A Prometheus counter that counts the invocations with different paths
    * e.g. /foo and /bar will be counted as 2 different paths
    */
    let pathsTaken = new Counter({
        name: 'pathsTaken',
        help: 'Paths taken in the app',
        labelNames: ['path']
    });

    /**
     * A Prometheus summary to record the HTTP method, path, response code and response time
     */
    let responses = new Summary({
        name: 'responses',
        help: 'Response time in millis',
        labelNames: ['method', 'path', 'status']
    });

    let prometheus = {

        /**
         * This funtion will start the collection of metrics and should be called from within in the main js file
         */
        startCollection : () => {  
            logger.info(`Starting the collection of metrics, the metrics are available on /metrics`);
            require('prom-client').collectDefaultMetrics();
        },

        /**
         * This function increments the counters that are executed on the request side of an invocation
         * Currently it increments the counters for numOfPaths and pathsTaken
         */
        requestCounters : (req, res, next) => {  
            if (req.path != '/metrics') {
                numOfRequests.inc({ method: req.method });
                pathsTaken.inc({ path: req.path });
            }
            next();
        },

        /**
         * This function increments the counters that are executed on the response side of an invocation
         * Currently it updates the responses summary
         */
        responseCounters : ResponseTime(function (req, res, time) {  
            if (req.url != '/metrics') {
                responses.labels(req.method, req.url, res.statusCode).observe(time);
            }
        }),

        /**
         * In order to have Prometheus get the data from this app a specific URL is registered
         */
        injectMetricsRoute : (app) => {  
            app.get('/metrics', (req, res) => {
                res.set('Content-Type', Register.contentType);
                res.end(Register.metrics());
            });
        }
 

    }
    return prometheus;
}

