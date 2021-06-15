import { PxbLoginComponent } from '../pages/login/login.component';
import { PxbForgotPasswordComponent } from '../pages/forgot-password/forgot-password.component';
import { PxbResetPasswordComponent } from '../pages/reset-password/reset-password.component';
import { PxbCreateAccountComponent } from '../pages/create-account/create-account.component';
import { PxbContactSupportComponent } from '../pages/contact-support/contact-support.component';
import { PxbCreateAccountInviteComponent } from '../pages/create-account-invite/create-account-invite.component';
import { AUTH_ROUTES } from './auth.routes';
import { Routes } from '@angular/router';
import { PxbAuthPageDisabledGuard } from '../guards/page-disabled/page-disabled-guard';

export function getAuthSubRoutes(): Routes {
    return [
        { path: '', redirectTo: AUTH_ROUTES.LOGIN, pathMatch: 'full' },
        { path: AUTH_ROUTES.LOGIN, component: PxbLoginComponent },
        {
            path: AUTH_ROUTES.RESET_PASSWORD,
            component: PxbResetPasswordComponent,
            canActivate: [PxbAuthPageDisabledGuard],
        },
        {
            path: AUTH_ROUTES.FORGOT_PASSWORD,
            component: PxbForgotPasswordComponent,
            canActivate: [PxbAuthPageDisabledGuard],
        },
        {
            path: AUTH_ROUTES.CREATE_ACCOUNT,
            component: PxbCreateAccountComponent,
            canActivate: [PxbAuthPageDisabledGuard],
        },
        {
            path: AUTH_ROUTES.CONTACT_SUPPORT,
            component: PxbContactSupportComponent,
            canActivate: [PxbAuthPageDisabledGuard],
        },
        {
            path: AUTH_ROUTES.CREATE_ACCOUNT_INVITE,
            component: PxbCreateAccountInviteComponent,
            canActivate: [PxbAuthPageDisabledGuard],
        },
    ];
}
