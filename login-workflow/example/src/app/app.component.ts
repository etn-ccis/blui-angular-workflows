import { Component } from '@angular/core';
import { AbstractControl, ValidatorFn } from '@angular/forms';
import {
    PxbAuthSecurityService,
    SecurityContext,
    PxbAuthConfig,
    PxbAuthUIService,
} from '@pxblue/angular-auth-workflow';
import { LocalStorageService } from './services/localStorage.service';
import {PxbAuthTranslations} from "../../../dist";

@Component({
    selector: 'app-root',
    template: `<router-outlet></router-outlet>`,
})
export class AppComponent {
    constructor(
        private readonly pxbAuthUIService: PxbAuthUIService,
        private readonly pxbSecurityService: PxbAuthSecurityService,
        private readonly pxbAuthConfig: PxbAuthConfig,
        private readonly localStorageService: LocalStorageService
    ) {
        this._configurePxbAuthModule();
        this._listenForAuthStateChanges();
    }

    private _configurePxbAuthModule(): void {
        void this.pxbAuthUIService.initiateSecurity();
        this.pxbAuthConfig.projectImage = 'assets/images/eaton_stacked_logo.png';
        this.pxbAuthConfig.backgroundImage = 'assets/images/background.svg';
        this.pxbAuthConfig.allowDebugMode = true;
        this.pxbAuthConfig.languageCode = 'EN';
        this.pxbSecurityService.inferOnAuthenticatedRoute('');
        this.pxbAuthConfig.customEmailValidator = this._getCustomEmailValidator();
        this.pxbAuthConfig.customPasswordRequirements = [
            {
                regex: /^((?!password).)*$/,
                description: 'Does not contain "password"',
            },
        ];
    }

    private _getCustomEmailValidator(): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } | null => {
            const forbidden = /test/i.test(control.value);
            return forbidden
                ? { PXB_LOGIN_VALIDATOR_ERROR_NAME: { message: 'This is a custom error, provided by end user' } }
                : null;
        };
    }

    // When a user transitions between being logged in / logged out, update session information.
    // This demo app stores session information in localStorage, this is just as a proof-of-concept.
    private _listenForAuthStateChanges(): void {
        this.pxbSecurityService.securityStateChanges().subscribe((state: SecurityContext) => {
            const email = state.rememberMeDetails.email;
            const rememberMe = state.rememberMeDetails.rememberMe;
            const isAuth = state.isAuthenticatedUser;
            this.localStorageService.setAuthData(rememberMe ? email : undefined, isAuth);
        });
    }
}
