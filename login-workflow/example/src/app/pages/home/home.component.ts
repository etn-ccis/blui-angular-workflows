import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BluiChangePasswordDialogService, AUTH_ROUTES, BluiAuthSecurityService } from '@brightlayer-ui/angular-auth-workflow';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
    constructor(
        private readonly _router: Router,
        private readonly _bluiSecurityService: BluiAuthSecurityService,
        public bluiSecurityService: BluiAuthSecurityService,
        public readonly _bluiChangePasswordService: BluiChangePasswordDialogService
    ) {}

    openDialog() {
        this._bluiChangePasswordService.openDialog();
    }

    logout(): void {
        console.log('Logging a user out of the app.');
        this._bluiSecurityService.updateSecurityState({ isAuthenticatedUser: false });
        void this._router.navigate([AUTH_ROUTES.AUTH_WORKFLOW]);
    }
}
