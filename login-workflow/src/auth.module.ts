import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { PxbLoginComponent } from './pages/login/login.component';
import { PxbForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { PxbResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { PxbCreateAccountComponent } from './pages/create-account/create-account.component';

@NgModule({
    declarations: [PxbLoginComponent, PxbForgotPasswordComponent, PxbResetPasswordComponent, PxbCreateAccountComponent],
    imports: [BrowserModule],
})
export class PxbAuthModule {}
