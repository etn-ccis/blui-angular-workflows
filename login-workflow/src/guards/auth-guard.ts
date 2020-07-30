import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { PxbAuthStateService } from '../services/state/state.service';

@Injectable({
    providedIn: 'root',
})
export class PxbAuthGuard implements CanActivate {
    constructor(public auth: PxbAuthStateService, public router: Router) {}
    canActivate(): boolean {
        if (!this.auth.isAuthenticated()) {
            void this.router.navigate(['']);
            return false;
        }
        return true;
    }
}
