import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { PxbSecurityService } from '../services/state/security.service';

@Injectable({
    providedIn: 'root',
})
export class PxbAuthGuard implements CanActivate {
    constructor(public securityService: PxbSecurityService, public router: Router) {}
    canActivate(): boolean {
        if (!this.securityService.getSecurityState().isAuthenticatedUser) {
            void this.router.navigate(['']);
            return false;
        }
        return true;
    }
}
