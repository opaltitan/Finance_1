/**
 * Created by Justin on 5/1/2016.
 */
/**
 * Created by Justin on 3/13/2016.
 */
var config = require('./config'),
    cookieParser = require('cookie-parser'),
    passport = require('passport'),
    dl = require('delivery'),
    fs = require('fs'),
    excelData = require('excel-data');

module.exports = function(server, io, mongoStore){
    // Using the session cookies, verify that the user is authenticated
    io.use(function(socket, next){
        cookieParser(config.sessionSecret)(socket.request, {}, function(err){
            var sessionId = socket.request.signedCookies['connect.sid'];

            mongoStore.get(sessionId, function(err, session){
                socket.request.session = session;

                passport.initialize()(socket.request, {}, function(){
                    passport.session()(socket.request, {}, function(){
                        if(socket.request.user){
                            next(null, true);
                        } else {
                            next(new Error('User is not authenticated'), false);
                        }
                    });
                });
            });
        });
    });

    io.sockets.on('connection', function(socket){
        console.log('connected');

        socket.on('disconnect', function(){
            console.log('disconnected');
        });

    });

};