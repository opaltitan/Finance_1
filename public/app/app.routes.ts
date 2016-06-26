/**
 * Created by Justin on 6/21/2016.
 */
import { StockSelectionComponent } from './stock.selection.component';
import { StockHomeComponent } from './stock.home.component';
import { StockComponent } from './stock.component';
import { ContactComponent } from './contact.component';
import { HomeComponent } from './home.component';
import { StockCreationComponent } from './stock.create.component';

export const AppRoutes = [
    { path: '', component: HomeComponent },
    { path: 'stock', component: StockComponent, children: [
        { path: '', component: StockHomeComponent},
        { path: ':id', component: StockSelectionComponent},
        { path: 'item/create', component: StockCreationComponent }
    ] },
    { path: 'contact', component: ContactComponent }
];