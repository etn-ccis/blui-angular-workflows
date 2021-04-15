import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {AUTH_ROUTES} from "@pxblue/angular-auth-workflow";

@Component({
    selector: 'app-pre-auth',
    template: `
        <button color="primary"
                (click)="router.navigate([routes.AUTH_WORKFLOW])" mat-stroked-button>Go Login</button>
        <button color="primary"
                (click)="router.navigate(['/dashboard'])" mat-flat-button>Go Auth Guarded Page</button>

    `,
})
export class PreAuthComponent {

    routes = AUTH_ROUTES;
    constructor(public router: Router) {
    }
}
