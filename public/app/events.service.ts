/**
 * Created by Justin on 6/12/2016.
 */

import { Component } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

export class EventsService {
    baseUrl: string;

    constructor(public http: Http) {
        this.baseUrl = "http://localhost:3001";
    }

    pull_Assets(){
        let queryUrl = `${this.baseUrl}/assets`;
        return this.http.request(queryUrl)
            .map(res => res.json());
    }

}