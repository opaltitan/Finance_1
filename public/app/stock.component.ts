/**
 * Created by Justin on 6/19/2016.
 */
import { Component } from '@angular/core';
import { CORE_DIRECTIVES } from '@angular/common';
import { Http, Response } from '@angular/http';
import { ROUTER_DIRECTIVES, Router, ActivatedRoute } from '@angular/router';
import { StockService } from './stock.service';

class Stock {
    _id: string;
    ticker: string;
    stockName: string;

    constructor(obj?: any){
        this._id = obj && obj._id || null;
        this.ticker = obj && obj.ticker || null;
        this.stockName = obj && obj.stockName || null;
    }
}

@Component({
    selector: 'stock',
    directives: [ ROUTER_DIRECTIVES ],
    template: `
        <div class="list-left">
            <h1>Stock</h1>
            <a [routerLink]="['item/create']">Create</a>
            <br>
            <ul>
                <li *ngFor="let stock of stocks">
                    <a [routerLink]="['stock', {id: stock._id }]">
                        <div class="list_item"><small>{{ stock.ticker }}</small></div>
                        <div class="list_item"><small>{{ stock.stockName }}</small></div>
                    </a>
                </li>
            </ul>
        </div>
        <router-outlet></router-outlet>
        `
})

export class StockComponent {
    stocks: Stock[];

    constructor(public router: Router, public http: Http){
        this.pullStocks();
    }

    pullStocks(): void {
        this.http.request('http://localhost:3001/api/stock')
            .subscribe((res: Response) => {
                this.stocks = res.json();
            });
    }
}