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
    var Stock, StockComponent;
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
                    this._id = obj && obj._id || null;
                    this.ticker = obj && obj.ticker || null;
                    this.stockName = obj && obj.stockName || null;
                }
                return Stock;
            })();
            StockComponent = (function () {
                function StockComponent(router, http) {
                    this.router = router;
                    this.http = http;
                    this.pullStocks();
                }
                StockComponent.prototype.pullStocks = function () {
                    var _this = this;
                    this.http.request('http://localhost:3001/api/stock')
                        .subscribe(function (res) {
                        _this.stocks = res.json();
                    });
                };
                StockComponent = __decorate([
                    core_1.Component({
                        selector: 'stock',
                        directives: [router_1.ROUTER_DIRECTIVES],
                        template: "\n        <div class=\"list-left\">\n            <h1>Stock</h1>\n            <a [routerLink]=\"['item/create']\">Create</a>\n            <br>\n            <ul>\n                <li *ngFor=\"let stock of stocks\">\n                    <a [routerLink]=\"['stock', {id: stock._id }]\">\n                        <div class=\"list_item\"><small>{{ stock.ticker }}</small></div>\n                        <div class=\"list_item\"><small>{{ stock.stockName }}</small></div>\n                    </a>\n                </li>\n            </ul>\n        </div>\n        <router-outlet></router-outlet>\n        "
                    }), 
                    __metadata('design:paramtypes', [router_1.Router, http_1.Http])
                ], StockComponent);
                return StockComponent;
            })();
            exports_1("StockComponent", StockComponent);
        }
    }
});
//# sourceMappingURL=stock.component.js.map