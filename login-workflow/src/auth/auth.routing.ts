import { Routes } from '@angular/router';
import { PxbLoginComponent } from '../pages/login/login.component';
import { PxbForgotPasswordComponent } from '../pages/forgot-password/forgot-password.component';
import { PxbResetPasswordComponent } from '../pages/reset-password/reset-password.component';
import { PxbCreateAccountComponent } from '../pages/create-account/create-account.component';
import { CREATE_ACCOUNT_ROUTE, FORGOT_PASSWORD_ROUTE, LOGIN_ROUTE, RESET_PASSWORD_ROUTE } from '../config/route-names';

export const authSubRoutes: Routes = [
    { path: '', redirectTo: LOGIN_ROUTE, pathMatch: 'full' },
    { path: LOGIN_ROUTE, component: PxbLoginComponent },
    { path: RESET_PASSWORD_ROUTE, component: PxbResetPasswordComponent },
    { path: FORGOT_PASSWORD_ROUTE, component: PxbForgotPasswordComponent },
    { path: CREATE_ACCOUNT_ROUTE, component: PxbCreateAccountComponent },
];
