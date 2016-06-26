/**
 * Created by Justin on 6/18/2016.
 */
/**
 * Created by Justin on 5/1/2016.
 */

var Stock = require('mongoose').model('Stock');
var request = require('request');

var getErrorMessage = function(err){
    var message = '';
    if(err.code){
        switch(err.code){
            case 11000:
            case 11001:
                message = 'something went wrong';
                break;
            default:
                message = 'Something went wrong';
        }
    } else {
        for (var errName in err.errors){
            if (err.errors[errName].message) message = err.errors[errName].message;
        }
    }
    return message;
};

exports.create = function(req, res, next){

    console.log(req);
    console.log(req.body);
    var stock = new Stock(req.body);

    stock.save(function(err){
        if(err){
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            req.stock = stock;
            next();
        }
    });

};

exports.list = function(req, res, next) {
    Stock.find()
        .exec(function(err, stocks){
            if(err){
                return res.status(400).send({
                    message: getErrorMessage(err)
                });
            } else {
                res.json(stocks);
            }
        });
};

exports.read = function(req, res){
    console.log(req.stock);
    res.json(req.stock);
};

exports.getCurrentPrices = function(req, res, next) {
    request('http://dev.markitondemand.com/MODApis/Api/v2/Quote/json?symbol=' + req.stock.ticker, function(error, response, body){
        if(!error && response.statusCode == 200){
            //console.log(body);
            var obj = JSON.parse(body);
            //console.log(obj);

            req.stock.currentPrice = {
                Status: obj.Status,
                LastPrice: obj.LastPrice,
                Change: obj.Change,
                ChangePercent: obj.ChangePercent,
                TimeStamp: obj.TimeStamp,
                MarketCap: obj.MarketCap,
                Volume: obj.Volume,
                ChangeYTD: obj.ChangeYTD,
                ChangePercentYTD: obj.ChangePercentYTD,
                High: obj.High,
                Low: obj.Low,
                Open: obj.Open
            };

            //console.log(req.stock);
            next();
        }
    });
};

exports.stockLookup = function(req, res, next, id){
    req.ticker = id;
    next();
};

exports.lookupList = function(req, res) {
    console.log('http://dev.markitondemand.com/MODApis/Api/v2/Lookup/json?input=' + req.ticker);
    request('http://dev.markitondemand.com/MODApis/Api/v2/Lookup/json?input=' + req.ticker, function(error, response, body){
        if(!error && response.statusCode == 200){
            //console.log(body);
            var obj = JSON.parse(body);
            //console.log(obj);
            console.log(obj);
            res.json(obj);
        }
    });
};

exports.stockByID = function(req, res, next, id) {
    Stock.findOne({
        _id: id
    }, function(err, stock) {
        if(err){
            return next(err);
        } else {
            req.stock = stock;

            next();

        }
    });
};

exports.update = function(req, res, next) {
    Stock.findByIdAndUpdate(req.stock.id, req.body, function(err, stock){
        if(err){
            return next(err);
        } else {
            res.json(stock);
        }
    });
};

exports.delete = function(req, res, next) {
    req.stock.remove(function(err){
        if(err){
            return next(err);
        } else {
            res.json(req.stock);
        }
    });
};
