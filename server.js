'use strict';

// Getting Env
require('dotenv').config();

// Getting Launcher
const launcher = require('./app/launcher');

// Set Configuration
launcher.bootstrap();

// Starting application
launcher.run();

// just to enable tests with mocha and chai
module.exports = launcher.app();