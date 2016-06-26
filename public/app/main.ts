/**
 * Created by Justin on 5/14/2016.
 */

import { Component } from '@angular/core';
import { CORE_DIRECTIVES } from '@angular/common';
import { HTTP_PROVIDERS } from '@angular/http';
import { bootstrap } from '@angular/platform-browser-dynamic';
import { ROUTER_DIRECTIVES, Router, provideRouter } from '@angular/router';

import { AppRoutes } from './app.routes';

@Component({
    selector: 'app',
    directives: [ ROUTER_DIRECTIVES ],
    template: `
        <ul class="header1">
          <li><a [routerLink]="['/stock']">Stocks</a></li>
          <li><a [routerLink]="['/contact']">Contact us</a></li>
        </ul>
        <router-outlet></router-outlet>
    `
})

class MyApp {
    constructor(public router: Router){

    }
}

bootstrap(MyApp, [ provideRouter(AppRoutes), HTTP_PROVIDERS ]);
