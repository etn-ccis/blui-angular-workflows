import { Routes } from '@angular/router';
import { PxbLoginComponent } from '../pages/login/login.component';
import { PxbForgotPasswordComponent } from '../pages/forgot-password/forgot-password.component';
import { PxbResetPasswordComponent } from '../pages/reset-password/reset-password.component';
import { PxbCreateAccountComponent } from '../pages/create-account/create-account.component';
import { CONTACT_SUPPORT_ROUTE, CREATE_ACCOUNT_INVITE_ROUTE, CREATE_ACCOUNT_ROUTE, FORGOT_PASSWORD_ROUTE, LOGIN_ROUTE, RESET_PASSWORD_ROUTE } from '../config/route-names';
import { PxbContactSupportComponent } from '../pages/contact-support/contact-support.component';
import { PxbCreateAccountInviteComponent } from '../pages/create-account-invite/create-account-invite.component';

export const authSubRoutes: Routes = [
    { path: '', redirectTo: LOGIN_ROUTE, pathMatch: 'full' },
    { path: LOGIN_ROUTE, component: PxbLoginComponent },
    { path: RESET_PASSWORD_ROUTE, component: PxbResetPasswordComponent },
    { path: FORGOT_PASSWORD_ROUTE, component: PxbForgotPasswordComponent },
    { path: CREATE_ACCOUNT_ROUTE, component: PxbCreateAccountComponent },
    { path: CONTACT_SUPPORT_ROUTE, component: PxbContactSupportComponent },
    { path: CREATE_ACCOUNT_INVITE_ROUTE, component: PxbCreateAccountInviteComponent }
];
