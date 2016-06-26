/**
 * Created by Justin on 6/25/2016.
 */
import { Component, OnInit, ElementRef, EventEmitter, Injectable } from '@angular/core';
import { CORE_DIRECTIVES } from '@angular/common';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { ROUTER_DIRECTIVES, Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { StockService } from './stock.service';

class Stock {
    ticker: string;
    stockName: string;
    marketExchange: string;

    constructor(obj?: any){
        this.ticker = obj.Symbol;
        this.stockName = obj.Name;
        this.marketExchange = obj.Exchange;
    }
}

/**
 * SearchBox displays the search box and emits events based on the results
 */

@Component({
    outputs: ['results'],
    providers: [StockService],
    selector: 'search-box',
    template: `
    <input type="text" class="form-control" placeholder="Search" autofocus>
  `
})

class SearchBox implements OnInit {
    results: EventEmitter<Stock[]> = new EventEmitter<Stock[]>();

    constructor(public stockService: StockService, private el: ElementRef) {
    }

    ngOnInit(): void {
        // convert the `keyup` event into an observable stream

        Observable.fromEvent(this.el.nativeElement, 'keyup')
            .map((e: any) => e.target.value) // extract the value of the input
            .filter((text: string) => text.length > 1) // filter out if empty
            .debounceTime(200)                         // only once every 150ms
            // search, discarding old events if new input comes in
            .map((query: string) => this.stockService.search(query))
            .switch()
            // act on the return of the search
            .subscribe(
                (results: Stock[]) => { // on sucesss
                    console.log(results);
                    this.results.next(results);
                },
                (err: any) => { // on error
                    console.log(err);
                },
                () => { // on completion

                }
            );

    }
}

@Component({
    inputs: ['result'],
    selector: 'search-result',
    template: `
        <div class="detail_line"><div class="create_label">{{ result.ticker }}</div><div class="create_item_long">{{ result.stockName }}</div><div class="create_item_short">{{ result.marketExchange }}</div><button type="button" (click)="addStock()">Add</button></div>
  `
})
export class SearchResultComponent {
    result: Stock;

    constructor(public http: Http){

    }

    addStock(): void {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        this.http.post('http://localhost:3001/api/stock',
            JSON.stringify({
                ticker: this.result.ticker,
                stockName: this.result.stockName
            }),
            { headers: headers}
            )
            .subscribe(
                (res: Response) => {
                    console.log(res.json());
                    console.log('Success!');
                }
            )
        ;
    }
}


@Component({
    selector: 'stock-create',
    directives: [ ROUTER_DIRECTIVES, SearchBox, SearchResultComponent ],
    template: `
      <div class="detail">
        <h1>Add Stock to List (Search)</h1>
        <div>
          <search-box
             (results)="updateResults($event)"
              ></search-box>
        </div>
        <br>
        <search-result
          *ngFor="let result of results"
          [result]="result">
        </search-result>
      </div>
        `
})

export class StockCreationComponent{
    results: Stock[];

    constructor(public router: Router, public activatedRoute: ActivatedRoute, public http: Http){
        console.log('here');
    }
    updateResults(results: Stock[]): void {
        this.results = results;
        // console.log("results:", this.results); // uncomment to take a look
    }

}