import { PxbLoginComponent } from '../pages/login/login.component';
import { PxbForgotPasswordComponent } from '../pages/forgot-password/forgot-password.component';
import { PxbResetPasswordComponent } from '../pages/reset-password/reset-password.component';
import { PxbCreateAccountComponent } from '../pages/create-account/create-account.component';
import { PxbContactSupportComponent } from '../pages/contact-support/contact-support.component';
import { PxbCreateAccountInviteComponent } from '../pages/create-account-invite/create-account-invite.component';
import { AUTH_ROUTES } from './auth.routes';
import { Route } from '@angular/router';

export function getAuthSubRoutes(): Map<string, Route> {
    const routeMap = new Map<string, Route>();
    routeMap.set('', { path: '', redirectTo: AUTH_ROUTES.LOGIN, pathMatch: 'full' });
    routeMap.set(AUTH_ROUTES.LOGIN, { path: AUTH_ROUTES.LOGIN, component: PxbLoginComponent });
    routeMap.set(AUTH_ROUTES.RESET_PASSWORD, {
        path: AUTH_ROUTES.RESET_PASSWORD,
        component: PxbResetPasswordComponent,
    });
    routeMap.set(AUTH_ROUTES.FORGOT_PASSWORD, {
        path: AUTH_ROUTES.FORGOT_PASSWORD,
        component: PxbForgotPasswordComponent,
    });
    routeMap.set(AUTH_ROUTES.CREATE_ACCOUNT, {
        path: AUTH_ROUTES.CREATE_ACCOUNT,
        component: PxbCreateAccountComponent,
    });
    routeMap.set(AUTH_ROUTES.CREATE_ACCOUNT_INVITE, {
        path: AUTH_ROUTES.CREATE_ACCOUNT_INVITE,
        component: PxbCreateAccountInviteComponent,
    });
    routeMap.set(AUTH_ROUTES.CONTACT_SUPPORT, {
        path: AUTH_ROUTES.CONTACT_SUPPORT,
        component: PxbContactSupportComponent,
    });
    return routeMap;
}
