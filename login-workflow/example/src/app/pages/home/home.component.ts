import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PxbChangePasswordModalService, PxbSecurityService } from '@pxblue/angular-auth-workflow';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
    constructor(
        private readonly _router: Router,
        private readonly _pxbSecurityService: PxbSecurityService,
        public readonly _changePasswordModalService: PxbChangePasswordModalService
    ) {}

    ngOnInit(): void {}

    openDialog() {
        this._changePasswordModalService.openDialog();
    }

    logout(): void {
        console.log('Logging a user out of the app.');
        const currState = this._pxbSecurityService.getSecurityState();
        this._pxbSecurityService.setSecurityState(
            Object.assign(currState, {
                email: currState.rememberMeDetails.email + 'haha',
                isAuthenticatedUser: false,
            })
        );
        void this._router.navigate(['auth']);
    }
}
