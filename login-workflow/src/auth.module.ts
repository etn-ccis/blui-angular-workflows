import { BrowserModule } from '@angular/platform-browser';
import { InjectionToken, NgModule } from '@angular/core';
import { PxbLoginComponent } from './pages/login/login.component';
import { PxbForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { PxbResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { PxbCreateAccountComponent } from './pages/create-account/create-account.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { PxbAuthComponent } from './auth/auth.component';
import { RouterModule } from '@angular/router';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { SpacerModule } from '@pxblue/angular-components';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

export type PxbAuthConfig = {
    homeRoute: string;
    authRoute: string;
};

export const PXB_AUTH_CONFIG = new InjectionToken<PxbAuthConfig>('');

@NgModule({
    declarations: [
        PxbLoginComponent,
        PxbForgotPasswordComponent,
        PxbResetPasswordComponent,
        PxbCreateAccountComponent,
        PxbAuthComponent,
    ],
    imports: [
        MatProgressSpinnerModule,
        SpacerModule,
        MatButtonModule,
        BrowserModule,
        MatFormFieldModule,
        MatInputModule,
        MatCardModule,
        ReactiveFormsModule,
        FormsModule,
        RouterModule,
        MatCheckboxModule,
    ],
    exports: [PxbAuthComponent],
})
export class PxbAuthModule {}
