/**
 * Created by Justin on 6/25/2016.
 */
import { Observable } from 'rxjs';
import { Component, OnInit, ElementRef, EventEmitter, Injectable } from '@angular/core';
import { CORE_DIRECTIVES } from '@angular/common';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { ROUTER_DIRECTIVES, Router, ActivatedRoute } from '@angular/router';


class Stock {
    ticker: string;
    stockName: string;
    marketExchange: string;

    constructor(obj?: any){
        this.ticker = obj.ticker;
        this.stockName = obj.stockName;
        this.marketExchange = obj.marketExchange;
    }
}

@Injectable()
export class StockService {
    newStock: Stock;

    constructor(public http: Http){

    }

    search(qLookup: string): Observable<Stock[]> {
        console.log('search');
        return this.http.get('http://localhost:3001/api/stock/lookup/' + qLookup)
            .map((response: Response) => {
                console.log(response.json());
                return (<any>response.json()).map(item => {
                        // console.log("raw item", item); // uncomment if you want to debug
                        console.log(item.Symbol);
                        return new Stock({
                            ticker: item.Symbol,
                            stockName: item.Name,
                            marketExchange: item.Exchange
                        });
                    })
                }
            )
    }

    addStock(stock: Stock): Observable<Stock> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return this.http.post('http://localhost:3001/api/stock',
            JSON.stringify({
                ticker: stock.ticker,
                stockName: stock.stockName
            }),
            { headers: headers})
            .map((response: Response) => {
                let res = <any>response.json();

                return new Stock({
                    ticker: res.ticker,
                    stockName: res.stockName
                });
            })
        ;
    }

}