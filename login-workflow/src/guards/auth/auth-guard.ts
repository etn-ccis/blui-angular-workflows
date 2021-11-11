import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { BluiAuthSecurityService } from '../../services/state/auth-security.service';
import { BluiAuthConfig } from '../../services/config/auth-config';
import { AUTH_ROUTES } from '../../auth/auth.routes';

@Injectable({
    providedIn: 'root',
})
export class BluiAuthGuard implements CanActivate {
    constructor(
        public bluiAuthConfig: BluiAuthConfig,
        public securityService: BluiAuthSecurityService,
        public router: Router
    ) {}

    canActivate(): boolean {
        if (!this.securityService.getSecurityState().isAuthenticatedUser) {
            const route =
                this.bluiAuthConfig.authGuardRedirectRoute === undefined
                    ? AUTH_ROUTES.AUTH_WORKFLOW
                    : this.bluiAuthConfig.authGuardRedirectRoute;
            void this.router.navigate([route]);
            return false;
        }
        return true;
    }
}
