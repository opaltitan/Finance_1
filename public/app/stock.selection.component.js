System.register(['@angular/core', '@angular/http', '@angular/router'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, http_1, router_1;
    var Stock, StockSelectionComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            }],
        execute: function() {
            Stock = (function () {
                function Stock(obj) {
                    this._id = obj._id;
                    this.ticker = obj.ticker;
                    this.stockName = obj.stockName;
                    this.created = obj.created;
                    this.status = obj.status;
                    this.lastPrice = obj.lastPrice;
                    this.change = obj.change;
                    this.changePercent = obj.changePercent;
                    this.timeStamp = obj.timeStamp;
                    this.marketCapitalization = obj.marketCapitalization;
                    this.tradingVolume = obj.tradingVolume;
                    this.changeYTD = obj.changeYTD;
                    this.changeYTDPercent = obj.changeYTDPercent;
                    this.priceHigh = obj.priceHigh;
                    this.priceLow = obj.priceLow;
                    this.priceOpen = obj.priceOpen;
                }
                return Stock;
            })();
            StockSelectionComponent = (function () {
                function StockSelectionComponent(activatedRoute, http) {
                    this.activatedRoute = activatedRoute;
                    this.http = http;
                }
                StockSelectionComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this.activatedRoute.params
                        .map(function (params) { return params['id']; })
                        .subscribe(function (id) {
                        _this.id = id;
                        _this.pullStock();
                    });
                };
                StockSelectionComponent.prototype.pullStock = function () {
                    var _this = this;
                    this.http.request('http://localhost:3001/api/stock/' + this.id)
                        .subscribe(function (res) {
                        console.log(res);
                        var u_id = res.json()._id;
                        var u_ticker = res.json().ticker;
                        var u_stockName = res.json().stockName;
                        var u_created = res.json().created;
                        var u_status = res.json().currentPrice.status;
                        var u_lastPrice = res.json().currentPrice.LastPrice;
                        var u_change = res.json().currentPrice.Change;
                        var u_changePercent = res.json().currentPrice.ChangePercent;
                        var u_timeStamp = res.json().currentPrice.TimeStamp;
                        var u_marketCapitalization = res.json().currentPrice.MarketCap;
                        var u_tradingVolume = res.json().currentPrice.Volume;
                        var u_changeYTD = res.json().currentPrice.ChangeYTD;
                        var u_changeYTDPercent = res.json().currentPrice.ChangePercentYTD;
                        var u_priceHigh = res.json().currentPrice.High;
                        var u_priceLow = res.json().currentPrice.Low;
                        var u_priceOpen = res.json().currentPrice.Open;
                        _this.stockSelected = {
                            _id: u_id,
                            ticker: u_ticker,
                            stockName: u_stockName,
                            created: u_created,
                            status: u_status,
                            lastPrice: u_lastPrice,
                            change: u_change,
                            changePercent: u_changePercent,
                            timeStamp: u_timeStamp,
                            marketCapitalization: u_marketCapitalization,
                            tradingVolume: u_tradingVolume,
                            changeYTD: u_changeYTD,
                            changeYTDPercent: u_changeYTDPercent,
                            priceHigh: u_priceHigh,
                            priceLow: u_priceLow,
                            priceOpen: u_priceOpen
                        };
                    });
                };
                StockSelectionComponent = __decorate([
                    core_1.Component({
                        selector: 'stock-detail',
                        inputs: ['stockSelected'],
                        directives: [router_1.ROUTER_DIRECTIVES],
                        template: "\n        <div class=\"detail\">\n            <h1>Daily Stock Activity</h1>\n            <div *ngIf=\"stockSelected\">\n                <div class=\"detail_line\"><div class=\"label\">Ticker:</div>{{ stockSelected.ticker }}</div>\n                <div class=\"detail_line\"><div class=\"label\">Stock Name:</div>{{ stockSelected.stockName }}</div>\n                <br>\n                <div class=\"detail_line\"><div class=\"label\">Last Price:</div>{{ stockSelected.lastPrice | number:'1.0-3' }}</div>\n                <div class=\"detail_line\"><div class=\"label\">Last Change (USD):</div>{{ stockSelected.change | number:'1.0-3' }}</div>\n                <div class=\"detail_line\"><div class=\"label\">Last Change (%):</div>{{ stockSelected.changePercent | number:'1.0-3' }}</div>\n                <br>\n                <div class=\"detail_line\"><div class=\"label\">Market Capitalization (USD):</div>{{ stockSelected.marketCapitalization | number:'1.0-3' }}</div>\n                <div class=\"detail_line\"><div class=\"label\">Trading Volume:</div>{{ stockSelected.tradingVolume | number:'1.0-3' }}</div>\n                <div class=\"detail_line\"><div class=\"label\">YTD Price Change (USD):</div>{{ stockSelected.changeYTD | number:'1.0-3' }}</div>\n                <div class=\"detail_line\"><div class=\"label\">YTD Price Change (%):</div>{{ stockSelected.changeYTDPercent | number:'1.0-3' }}</div>\n                <div class=\"detail_line\"><div class=\"label\">Current Day High (USD):</div>{{ stockSelected.priceHigh | number:'1.0-3' }}</div>\n                <div class=\"detail_line\"><div class=\"label\">Current Day Low (USD):</div>{{ stockSelected.priceLow | number:'1.0-3' }}</div>\n                <div class=\"detail_line\"><div class=\"label\">Current Day Open (USD):</div>{{ stockSelected.priceOpen | number:'1.0-3' }}</div>\n            </div>\n        </div>\n        "
                    }), 
                    __metadata('design:paramtypes', [router_1.ActivatedRoute, http_1.Http])
                ], StockSelectionComponent);
                return StockSelectionComponent;
            })();
            exports_1("StockSelectionComponent", StockSelectionComponent);
        }
    }
});
//# sourceMappingURL=stock.selection.component.js.map