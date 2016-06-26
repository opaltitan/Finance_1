/**
 * Created by Justin on 5/14/2016.
 */
System.register(['@angular/core', '@angular/http', '@angular/platform-browser-dynamic', '@angular/router', './app.routes'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, http_1, platform_browser_dynamic_1, router_1, app_routes_1;
    var MyApp;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (platform_browser_dynamic_1_1) {
                platform_browser_dynamic_1 = platform_browser_dynamic_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (app_routes_1_1) {
                app_routes_1 = app_routes_1_1;
            }],
        execute: function() {
            MyApp = (function () {
                function MyApp(router) {
                    this.router = router;
                }
                MyApp = __decorate([
                    core_1.Component({
                        selector: 'app',
                        directives: [router_1.ROUTER_DIRECTIVES],
                        template: "\n        <ul class=\"header1\">\n          <li><a [routerLink]=\"['/stock']\">Stocks</a></li>\n          <li><a [routerLink]=\"['/contact']\">Contact us</a></li>\n        </ul>\n        <router-outlet></router-outlet>\n    "
                    }), 
                    __metadata('design:paramtypes', [router_1.Router])
                ], MyApp);
                return MyApp;
            })();
            platform_browser_dynamic_1.bootstrap(MyApp, [router_1.provideRouter(app_routes_1.AppRoutes), http_1.HTTP_PROVIDERS]);
        }
    }
});
//# sourceMappingURL=main.js.map