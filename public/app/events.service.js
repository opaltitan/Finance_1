/**
 * Created by Justin on 6/12/2016.
 */
System.register(['rxjs/add/operator/map'], function(exports_1) {
    var EventsService;
    return {
        setters:[
            function (_1) {}],
        execute: function() {
            EventsService = (function () {
                function EventsService(http) {
                    this.http = http;
                    this.baseUrl = "http://localhost:3001";
                }
                EventsService.prototype.pull_Assets = function () {
                    var queryUrl = this.baseUrl + "/assets";
                    return this.http.request(queryUrl)
                        .map(function (res) { return res.json(); });
                };
                return EventsService;
            })();
            exports_1("EventsService", EventsService);
        }
    }
});
//# sourceMappingURL=events.service.js.map