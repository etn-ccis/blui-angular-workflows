import { Routes } from '@angular/router';
import { PxbLoginComponent } from '../pages/login/login.component';
import { PxbForgotPasswordComponent } from '../pages/forgot-password/forgot-password.component';
import { PxbResetPasswordComponent } from '../pages/reset-password/reset-password.component';
import { PxbCreateAccountComponent } from '../pages/create-account/create-account.component'; // CLI imports router

export const LOGIN_ROUTE = 'login';
export const RESET_PASSWORD_ROUTE = 'reset-password';
export const FORGOT_PASSWORD_ROUTE = 'forgot-password';
export const CREATE_ACCOUNT_ROUTE = 'create-account';

export const authSubRoutes: Routes = [
    { path: '', redirectTo: LOGIN_ROUTE, pathMatch: 'prefix' },
    { path: LOGIN_ROUTE, component: PxbLoginComponent },
    { path: RESET_PASSWORD_ROUTE, component: PxbResetPasswordComponent },
    { path: FORGOT_PASSWORD_ROUTE, component: PxbForgotPasswordComponent },
    { path: CREATE_ACCOUNT_ROUTE, component: PxbCreateAccountComponent },
];
