import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { PxbAuthSecurityService } from '../services/state/auth-security.service';
import { PxbAuthConfig } from '../services/config/auth-config';
import { AUTH_ROUTES } from '../auth/auth.routes';

@Injectable({
    providedIn: 'root',
})
export class PxbAuthGuard implements CanActivate {
    constructor(
        public pxbAuthConfig: PxbAuthConfig,
        public securityService: PxbAuthSecurityService,
        public router: Router
    ) {}

    canActivate(): boolean {
        if (!this.securityService.getSecurityState().isAuthenticatedUser) {
            void this.router.navigate([this.pxbAuthConfig.authGuardRedirectRoute || AUTH_ROUTES.AUTH_WORKFLOW]);
            return false;
        }
        return true;
    }
}
