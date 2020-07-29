import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { PxbLoginComponent } from './pages/login/login.component';
import { PxbForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { PxbResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { PxbCreateAccountComponent } from './pages/create-account/create-account.component';
import {MatCardModule} from "@angular/material/card";
import { PxbFloatCardComponent } from './pages/float-card/float-card.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";

@NgModule({
    declarations: [
      PxbLoginComponent,
      PxbForgotPasswordComponent,
      PxbResetPasswordComponent,
      PxbCreateAccountComponent,
      PxbFloatCardComponent],
  imports: [BrowserModule, MatFormFieldModule, MatInputModule, MatCardModule, ReactiveFormsModule, FormsModule],
})
export class PxbAuthModule {}
