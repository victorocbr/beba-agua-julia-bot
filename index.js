require('dotenv').config();

const bot = require('./bot/bot');
require('./web')(bot);
