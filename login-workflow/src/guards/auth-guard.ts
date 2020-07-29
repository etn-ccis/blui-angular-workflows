import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { PxbAuthService } from '../auth/auth.service';

@Injectable({
    providedIn: 'root',
})
export class PxbAuthGuard implements CanActivate {
    constructor(public auth: PxbAuthService, public router: Router) {}
    canActivate(): boolean {
        if (!this.auth.isAuthenticated()) {
            this.router.navigate(['login']);
            return false;
        }
        return true;
    }
}
