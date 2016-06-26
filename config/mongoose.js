/**
 * Created by Justin on 5/1/2016.
 */
var config = require('./config'),
    mongoose = require('mongoose');

module.exports = function() {
    var db = mongoose.connect(config.db);
    require('../models/user.server.model');
    require('../models/stock.server.model');
    return db;
};