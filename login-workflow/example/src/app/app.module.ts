import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {AppRoutingModule} from './app.routing';
import { PxbAuthModule } from '@pxblue/angular-auth-workflow';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatCardModule} from "@angular/material/card";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@NgModule({
    declarations: [
      AppComponent,
      HomeComponent,
    ],
    imports: [
      BrowserModule, MatFormFieldModule, MatInputModule, MatCardModule, ReactiveFormsModule, FormsModule,
  PxbAuthModule, AppRoutingModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
