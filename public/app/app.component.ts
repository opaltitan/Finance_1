/**
 * Created by Justin on 5/10/2016.
 */
import { Component } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { EventsService } from './events.service';

@Component({
    selector: 'simple-http',
    template: `
        <h2>Basic Request</h2>
        <button type="button" (click)="makeRequest()">Make Request</button>
        <div *ngIf="loading">loading...</div>
        <pre>{{ data | json }}</pre>
    `
})

export class SimpleHTTPComponent {
    data: Object;
    loading: boolean;

    constructor(public http: Http, public eventService: EventsService){
        eventService.pull_Assets()
            .subscribe((res: Response) => {
                console.log(res.json());
            });
    }

    makeRequest(): void {
        this.loading = true;
        this.http.request('http://jsonplaceholder.typicode.com/posts/1')
            .subscribe((res: Response) => {
                this.data = res.json();
                this.loading = false;
            });
    }
}