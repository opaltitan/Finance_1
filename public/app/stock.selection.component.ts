/**
 * Created by Justin on 6/20/2016.
 */
import { Component } from '@angular/core';
import { CORE_DIRECTIVES } from '@angular/common';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { ROUTER_DIRECTIVES, Router, ActivatedRoute } from '@angular/router';


class Stock {
    _id: string;
    ticker: string;
    stockName: string;
    created: Date;
    status: string;
    lastPrice: number;
    change: number;
    changePercent: number;
    timeStamp: Date;
    marketCapitalization: number;
    tradingVolume: number;
    changeYTD: number;
    changeYTDPercent: number;
    priceHigh: number;
    priceLow: number;
    priceOpen: number;

    constructor(obj?: any){
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
}

@Component({
    selector: 'stock-detail',
    inputs: ['stockSelected'],
    directives: [ ROUTER_DIRECTIVES ],
    template: `
        <div class="detail">
            <h1>Daily Stock Activity</h1>
            <div *ngIf="stockSelected">
                <div class="detail_line"><div class="label">Ticker:</div>{{ stockSelected.ticker }}</div>
                <div class="detail_line"><div class="label">Stock Name:</div>{{ stockSelected.stockName }}</div>
                <br>
                <div class="detail_line"><div class="label">Last Price:</div>{{ stockSelected.lastPrice | number:'1.0-3' }}</div>
                <div class="detail_line"><div class="label">Last Change (USD):</div>{{ stockSelected.change | number:'1.0-3' }}</div>
                <div class="detail_line"><div class="label">Last Change (%):</div>{{ stockSelected.changePercent | number:'1.0-3' }}</div>
                <br>
                <div class="detail_line"><div class="label">Market Capitalization (USD):</div>{{ stockSelected.marketCapitalization | number:'1.0-3' }}</div>
                <div class="detail_line"><div class="label">Trading Volume:</div>{{ stockSelected.tradingVolume | number:'1.0-3' }}</div>
                <div class="detail_line"><div class="label">YTD Price Change (USD):</div>{{ stockSelected.changeYTD | number:'1.0-3' }}</div>
                <div class="detail_line"><div class="label">YTD Price Change (%):</div>{{ stockSelected.changeYTDPercent | number:'1.0-3' }}</div>
                <div class="detail_line"><div class="label">Current Day High (USD):</div>{{ stockSelected.priceHigh | number:'1.0-3' }}</div>
                <div class="detail_line"><div class="label">Current Day Low (USD):</div>{{ stockSelected.priceLow | number:'1.0-3' }}</div>
                <div class="detail_line"><div class="label">Current Day Open (USD):</div>{{ stockSelected.priceOpen | number:'1.0-3' }}</div>
            </div>
        </div>
        `
})

export class StockSelectionComponent{
    stockSelected: Stock;

    id: string;

    ngOnInit() {
        this.activatedRoute.params
            .map(params => params['id'])
            .subscribe((id) => {
                this.id = id;
                this.pullStock();
            });
    }

    constructor(public activatedRoute: ActivatedRoute, public http: Http){

    }

    pullStock(): void {
        this.http.request('http://localhost:3001/api/stock/' + this.id)
            .subscribe((res: Response) => {
                console.log(res);
                let u_id = res.json()._id;
                let u_ticker = res.json().ticker;
                let u_stockName = res.json().stockName;
                let u_created = res.json().created;

                let u_status = res.json().currentPrice.status;
                let u_lastPrice = res.json().currentPrice.LastPrice;
                let u_change = res.json().currentPrice.Change;
                let u_changePercent = res.json().currentPrice.ChangePercent;
                let u_timeStamp = res.json().currentPrice.TimeStamp;
                let u_marketCapitalization = res.json().currentPrice.MarketCap;
                let u_tradingVolume = res.json().currentPrice.Volume;
                let u_changeYTD = res.json().currentPrice.ChangeYTD;
                let u_changeYTDPercent = res.json().currentPrice.ChangePercentYTD;
                let u_priceHigh = res.json().currentPrice.High;
                let u_priceLow = res.json().currentPrice.Low;
                let u_priceOpen = res.json().currentPrice.Open;

                this.stockSelected = {
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
                }
            });
    }


}