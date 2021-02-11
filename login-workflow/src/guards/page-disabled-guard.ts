import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { PxbAuthSecurityService } from '../services/state/auth-security.service';
import { PxbAuthConfig } from '../services/config/auth-config';
import { matchesRoute } from '../util/matcher';

@Injectable({
    providedIn: 'root',
})
export class PxbAuthPageDisabledGuard implements CanActivate {
    constructor(
        public securityService: PxbAuthSecurityService,
        private readonly _pxbAuthConfig: PxbAuthConfig,
        public router: Router
    ) {}

    navigateRoot(): boolean {
        void this.router.navigate(['']);
        return false;
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const url = state.url;
        const showLogin = matchesRoute(url, 'LOGIN');
        const showResetPassword = matchesRoute(url, 'RESET_PASSWORD');
        const showCreateAccount = matchesRoute(url, 'CREATE_ACCOUNT');
        const showForgotPassword = matchesRoute(url, 'FORGOT_PASSWORD');
        const showContactSupport = matchesRoute(url, 'CONTACT_SUPPORT');
        const showCreateAccountInvite = matchesRoute(url, 'CREATE_ACCOUNT_INVITE');
        const isEmptyUrl = url === undefined || url === '' || url === '/';

        if (showLogin || isEmptyUrl) {
            return true;
        }
        if (!this._pxbAuthConfig.showContactSupport && showContactSupport) {
            return this.navigateRoot();
        }
        if (!this._pxbAuthConfig.showCreateAccount && showCreateAccount) {
            return this.navigateRoot();
        }
        if (!this._pxbAuthConfig.showForgotPassword && showForgotPassword) {
            return this.navigateRoot();
        }
        if (!this._pxbAuthConfig.showResetPassword && showResetPassword) {
            return this.navigateRoot();
        }
        if (!this._pxbAuthConfig.showCreateAccountViaInvite && showCreateAccountInvite) {
            return this.navigateRoot();
        }
        // Enable direct routing to internal auth pages if the config has not disabled them.
        if (
            showLogin ||
            showResetPassword ||
            showCreateAccount ||
            showForgotPassword ||
            showContactSupport ||
            showCreateAccountInvite
        ) {
            return true;
        }
        return true;
    }
}
