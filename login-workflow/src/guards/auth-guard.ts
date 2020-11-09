import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { PxbAuthSecurityService } from '../services/state/auth-security.service';

@Injectable({
    providedIn: 'root',
})
export class PxbAuthGuard implements CanActivate {
    constructor(public securityService: PxbAuthSecurityService, public router: Router) {}
    canActivate(): boolean {
        if (!this.securityService.getSecurityState().isAuthenticatedUser) {
            void this.router.navigate(['']);
            return false;
        }
        return true;
    }
}
