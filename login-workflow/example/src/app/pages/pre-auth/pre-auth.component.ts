import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AUTH_ROUTES, PxbAuthSecurityService, SecurityContext } from '@pxblue/angular-auth-workflow';

@Component({
    selector: 'app-pre-auth',
    template: `
        isAuthenticated?: {{ isAuth }}
        <br />
        <button color="primary" (click)="goLogin()" mat-stroked-button>Go Login</button>
        <button color="primary" (click)="goHome()" mat-stroked-button>Go Home</button>
        <button color="primary" (click)="goDashboard()" mat-flat-button>Go Dashboard</button>
    `,
})
export class PreAuthComponent {
    isAuth = false;
    routes = AUTH_ROUTES;

    constructor(public router: Router, public pxbSecurityService: PxbAuthSecurityService) {
        this._listenForAuthStateChanges();
    }

    goLogin(): void {
        this.routes.ON_AUTHENTICATED = '';
        void this.router.navigate([this.routes.AUTH_WORKFLOW]);
    }

    goHome(): void {
        this.routes.ON_AUTHENTICATED = '';
        void this.router.navigate(['']);
    }

    goDashboard(): void {
        this.routes.ON_AUTHENTICATED = 'dashboard';
        void this.router.navigate(['/dashboard']);
    }

    private _listenForAuthStateChanges(): void {
        this.pxbSecurityService.securityStateChanges().subscribe((state: SecurityContext) => {
            this.isAuth = state.isAuthenticatedUser;
        });
    }
}
