import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
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
import { EmptyStateModule, SpacerModule } from '@pxblue/angular-components';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { PxbContactSupportComponent } from './pages/public-api';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { PasswordStrengthCheckComponent } from './components/password-strength-checker/password-strength-checker.component';

@NgModule({
    declarations: [
        PxbLoginComponent,
        PxbForgotPasswordComponent,
        PxbResetPasswordComponent,
        PxbCreateAccountComponent,
        PxbAuthComponent,
        PxbContactSupportComponent,
        PasswordStrengthCheckComponent
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
        MatIconModule,
        MatDividerModule,
        EmptyStateModule,
        MatListModule
    ],
    exports: [
        PxbAuthComponent,
        PxbLoginComponent,
        PxbForgotPasswordComponent,
        PxbCreateAccountComponent,
        PxbResetPasswordComponent,
        PxbContactSupportComponent,
    ],
})
export class PxbAuthModule {}
