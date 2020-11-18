import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PxbChangePasswordDialogService, AUTH_ROUTE, PxbAuthSecurityService } from '@pxblue/angular-auth-workflow';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
    constructor(
        private readonly _router: Router,
        private readonly _pxbSecurityService: PxbAuthSecurityService,
        public readonly _pxbChangePasswordService: PxbChangePasswordDialogService
    ) {}

    openDialog() {
        this._pxbChangePasswordService.openDialog();
    }

    logout(): void {
        console.log('Logging a user out of the app.');
        this._pxbSecurityService.updateSecurityState({ isAuthenticatedUser: false });
        void this._router.navigate([AUTH_ROUTE]);
    }
}
