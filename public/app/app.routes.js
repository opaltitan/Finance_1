System.register(['./stock.selection.component', './stock.home.component', './stock.component', './contact.component', './home.component', './stock.create.component'], function(exports_1) {
    var stock_selection_component_1, stock_home_component_1, stock_component_1, contact_component_1, home_component_1, stock_create_component_1;
    var AppRoutes;
    return {
        setters:[
            function (stock_selection_component_1_1) {
                stock_selection_component_1 = stock_selection_component_1_1;
            },
            function (stock_home_component_1_1) {
                stock_home_component_1 = stock_home_component_1_1;
            },
            function (stock_component_1_1) {
                stock_component_1 = stock_component_1_1;
            },
            function (contact_component_1_1) {
                contact_component_1 = contact_component_1_1;
            },
            function (home_component_1_1) {
                home_component_1 = home_component_1_1;
            },
            function (stock_create_component_1_1) {
                stock_create_component_1 = stock_create_component_1_1;
            }],
        execute: function() {
            exports_1("AppRoutes", AppRoutes = [
                { path: '', component: home_component_1.HomeComponent },
                { path: 'stock', component: stock_component_1.StockComponent, children: [
                        { path: '', component: stock_home_component_1.StockHomeComponent },
                        { path: ':id', component: stock_selection_component_1.StockSelectionComponent },
                        { path: 'item/create', component: stock_create_component_1.StockCreationComponent }
                    ] },
                { path: 'contact', component: contact_component_1.ContactComponent }
            ]);
        }
    }
});
//# sourceMappingURL=app.routes.js.map