import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PxbLoginComponent } from './pages/login/login.component';
import { PxbForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { PxbResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { HomeComponent } from './pages/home/home.component';
import { AppRoutingModule } from './app.routing';
import { PxbCreateAccountComponent } from './pages/create-account/create-account.component';

@NgModule({
    declarations: [
      AppComponent,
      HomeComponent,
      PxbLoginComponent,
      PxbForgotPasswordComponent,
      PxbResetPasswordComponent,
      PxbCreateAccountComponent],
    imports: [BrowserModule, AppRoutingModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
