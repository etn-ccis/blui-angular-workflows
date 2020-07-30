import { Component, Inject } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { PXB_AUTH_CONFIG, PxbAuthConfig } from '../config/auth-config';
import {CREATE_ACCOUNT_ROUTE, FORGOT_PASSWORD_ROUTE, LOGIN_ROUTE, RESET_PASSWORD_ROUTE} from "../config/route-names";

@Component({
    selector: 'pxb-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.scss'],
})
export class PxbAuthComponent {
    showLogin: boolean;
    showForgotPassword: boolean;
    showCreateAccount: boolean;
    showResetPassword: boolean;

    constructor(router: Router, @Inject(PXB_AUTH_CONFIG) private readonly _config: PxbAuthConfig) {
        router.events.subscribe((route) => {
            if (route instanceof NavigationEnd) {
                this.resetSelectedRoute();
                this.showLogin = this.matches(route, LOGIN_ROUTE);
                this.showCreateAccount = this.matches(route, CREATE_ACCOUNT_ROUTE);
                this.showForgotPassword = this.matches(route, FORGOT_PASSWORD_ROUTE);
                this.showResetPassword = this.matches(route, RESET_PASSWORD_ROUTE);
            }
        });
    }

    resetSelectedRoute(): void {
        this.showLogin = false;
        this.showForgotPassword = false;
        this.showCreateAccount = false;
        this.showResetPassword = false;
    }

    matches(route: NavigationEnd, targetRoute: string): boolean {
        const potentialAuthRoute = `/${this._config.authRoute}/${targetRoute}`;
        return route.urlAfterRedirects === potentialAuthRoute;
    }
}
