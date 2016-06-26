System.register(['@angular/core', '@angular/http', '@angular/router', 'rxjs', './stock.service'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, http_1, router_1, rxjs_1, stock_service_1;
    var Stock, SearchBox, SearchResultComponent, StockCreationComponent;
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
            },
            function (rxjs_1_1) {
                rxjs_1 = rxjs_1_1;
            },
            function (stock_service_1_1) {
                stock_service_1 = stock_service_1_1;
            }],
        execute: function() {
            Stock = (function () {
                function Stock(obj) {
                    this.ticker = obj.Symbol;
                    this.stockName = obj.Name;
                    this.marketExchange = obj.Exchange;
                }
                return Stock;
            })();
            /**
             * SearchBox displays the search box and emits events based on the results
             */
            SearchBox = (function () {
                function SearchBox(stockService, el) {
                    this.stockService = stockService;
                    this.el = el;
                    this.results = new core_1.EventEmitter();
                }
                SearchBox.prototype.ngOnInit = function () {
                    // convert the `keyup` event into an observable stream
                    var _this = this;
                    rxjs_1.Observable.fromEvent(this.el.nativeElement, 'keyup')
                        .map(function (e) { return e.target.value; }) // extract the value of the input
                        .filter(function (text) { return text.length > 1; }) // filter out if empty
                        .debounceTime(200) // only once every 150ms
                        .map(function (query) { return _this.stockService.search(query); })
                        .switch()
                        .subscribe(function (results) {
                        console.log(results);
                        _this.results.next(results);
                    }, function (err) {
                        console.log(err);
                    }, function () {
                    });
                };
                SearchBox = __decorate([
                    core_1.Component({
                        outputs: ['results'],
                        providers: [stock_service_1.StockService],
                        selector: 'search-box',
                        template: "\n    <input type=\"text\" class=\"form-control\" placeholder=\"Search\" autofocus>\n  "
                    }), 
                    __metadata('design:paramtypes', [stock_service_1.StockService, core_1.ElementRef])
                ], SearchBox);
                return SearchBox;
            })();
            SearchResultComponent = (function () {
                function SearchResultComponent(http) {
                    this.http = http;
                }
                SearchResultComponent.prototype.addStock = function () {
                    var headers = new http_1.Headers();
                    headers.append('Content-Type', 'application/json');
                    this.http.post('http://localhost:3001/api/stock', JSON.stringify({
                        ticker: this.result.ticker,
                        stockName: this.result.stockName
                    }), { headers: headers })
                        .subscribe(function (res) {
                        console.log(res.json());
                        console.log('Success!');
                    });
                };
                SearchResultComponent = __decorate([
                    core_1.Component({
                        inputs: ['result'],
                        selector: 'search-result',
                        template: "\n        <div class=\"detail_line\"><div class=\"create_label\">{{ result.ticker }}</div><div class=\"create_item_long\">{{ result.stockName }}</div><div class=\"create_item_short\">{{ result.marketExchange }}</div><button type=\"button\" (click)=\"addStock()\">Add</button></div>\n  "
                    }), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], SearchResultComponent);
                return SearchResultComponent;
            })();
            exports_1("SearchResultComponent", SearchResultComponent);
            StockCreationComponent = (function () {
                function StockCreationComponent(router, activatedRoute, http) {
                    this.router = router;
                    this.activatedRoute = activatedRoute;
                    this.http = http;
                    console.log('here');
                }
                StockCreationComponent.prototype.updateResults = function (results) {
                    this.results = results;
                    // console.log("results:", this.results); // uncomment to take a look
                };
                StockCreationComponent = __decorate([
                    core_1.Component({
                        selector: 'stock-create',
                        directives: [router_1.ROUTER_DIRECTIVES, SearchBox, SearchResultComponent],
                        template: "\n      <div class=\"detail\">\n        <h1>Add Stock to List (Search)</h1>\n        <div>\n          <search-box\n             (results)=\"updateResults($event)\"\n              ></search-box>\n        </div>\n        <br>\n        <search-result\n          *ngFor=\"let result of results\"\n          [result]=\"result\">\n        </search-result>\n      </div>\n        "
                    }), 
                    __metadata('design:paramtypes', [router_1.Router, router_1.ActivatedRoute, http_1.Http])
                ], StockCreationComponent);
                return StockCreationComponent;
            })();
            exports_1("StockCreationComponent", StockCreationComponent);
        }
    }
});
//# sourceMappingURL=stock.create.component.js.map