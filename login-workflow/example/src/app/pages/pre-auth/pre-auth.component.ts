import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AUTH_ROUTES, PxbAuthSecurityService, SecurityContext } from '@pxblue/angular-auth-workflow';

@Component({
    selector: 'app-pre-auth',
    template: `
        isAuthenticated?: {{isAuth}}
        <br />
        <button color="primary" (click)="router.navigate([routes.AUTH_WORKFLOW])" mat-stroked-button>Go Login</button>
        <button color="primary" (click)="router.navigate(['/dashboard'])" mat-flat-button>Go Auth Guarded Page</button>
    `,
})
export class PreAuthComponent {
    isAuth = false;
    routes = AUTH_ROUTES;

    constructor(public router: Router, public pxbSecurityService: PxbAuthSecurityService) {
        this._listenForAuthStateChanges();
    }


    // When a user transitions between being logged in / logged out, update session information.
    // This demo app stores session information in localStorage, this is just as a proof-of-concept.
    private _listenForAuthStateChanges(): void {
        this.pxbSecurityService.securityStateChanges().subscribe((state: SecurityContext) => {
            console.log(state);
            this.isAuth = state.isAuthenticatedUser;
        });
    }
}
