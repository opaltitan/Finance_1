System.register(['@angular/core', '@angular/http'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, http_1;
    var Stock, StockService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            }],
        execute: function() {
            Stock = (function () {
                function Stock(obj) {
                    this.ticker = obj.ticker;
                    this.stockName = obj.stockName;
                    this.marketExchange = obj.marketExchange;
                }
                return Stock;
            })();
            StockService = (function () {
                function StockService(http) {
                    this.http = http;
                }
                StockService.prototype.search = function (qLookup) {
                    console.log('search');
                    return this.http.get('http://localhost:3001/api/stock/lookup/' + qLookup)
                        .map(function (response) {
                        console.log(response.json());
                        return response.json().map(function (item) {
                            // console.log("raw item", item); // uncomment if you want to debug
                            console.log(item.Symbol);
                            return new Stock({
                                ticker: item.Symbol,
                                stockName: item.Name,
                                marketExchange: item.Exchange
                            });
                        });
                    });
                };
                StockService.prototype.addStock = function (stock) {
                    var headers = new http_1.Headers();
                    headers.append('Content-Type', 'application/json');
                    return this.http.post('http://localhost:3001/api/stock', JSON.stringify({
                        ticker: stock.ticker,
                        stockName: stock.stockName
                    }), { headers: headers })
                        .map(function (response) {
                        var res = response.json();
                        return new Stock({
                            ticker: res.ticker,
                            stockName: res.stockName
                        });
                    });
                };
                StockService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], StockService);
                return StockService;
            })();
            exports_1("StockService", StockService);
        }
    }
});
//# sourceMappingURL=stock.service.js.map