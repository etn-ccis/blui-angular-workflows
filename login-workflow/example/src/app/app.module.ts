import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {AppRoutingModule} from './app.routing';
import { PxbAuthModule } from '@pxblue/angular-auth-workflow';

@NgModule({
    declarations: [
      AppComponent,
      HomeComponent,
    ],
    imports: [
      PxbAuthModule, BrowserModule, AppRoutingModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
