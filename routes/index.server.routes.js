/**
 * Created by Justin on 5/1/2016.
 */
module.exports = function(app){
    var index = require('../controllers/index.server.controller');
    app.get('/', index.render);
};