import { BluiLoginComponent } from '../pages/login/login.component';
import { BluiForgotPasswordComponent } from '../pages/forgot-password/forgot-password.component';
import { BluiResetPasswordComponent } from '../pages/reset-password/reset-password.component';
import { BluiCreateAccountComponent } from '../pages/create-account/create-account.component';
import { BluiContactSupportComponent } from '../pages/contact-support/contact-support.component';
import { BluiCreateAccountInviteComponent } from '../pages/create-account-invite/create-account-invite.component';
import { AUTH_ROUTES } from './auth.routes';
import { Routes } from '@angular/router';
import { BluiAuthPageDisabledGuard } from '../guards/page-disabled/page-disabled-guard';

export function getAuthSubRoutes(): Routes {
    return [
        { path: '', redirectTo: AUTH_ROUTES.LOGIN, pathMatch: 'full' },
        { path: AUTH_ROUTES.LOGIN, component: BluiLoginComponent },
        {
            path: AUTH_ROUTES.RESET_PASSWORD,
            component: BluiResetPasswordComponent,
            canActivate: [BluiAuthPageDisabledGuard],
        },
        {
            path: AUTH_ROUTES.FORGOT_PASSWORD,
            component: BluiForgotPasswordComponent,
            canActivate: [BluiAuthPageDisabledGuard],
        },
        {
            path: AUTH_ROUTES.CREATE_ACCOUNT,
            component: BluiCreateAccountComponent,
            canActivate: [BluiAuthPageDisabledGuard],
        },
        {
            path: AUTH_ROUTES.CONTACT_SUPPORT,
            component: BluiContactSupportComponent,
            canActivate: [BluiAuthPageDisabledGuard],
        },
        {
            path: AUTH_ROUTES.CREATE_ACCOUNT_INVITE,
            component: BluiCreateAccountInviteComponent,
            canActivate: [BluiAuthPageDisabledGuard],
        },
    ];
}
