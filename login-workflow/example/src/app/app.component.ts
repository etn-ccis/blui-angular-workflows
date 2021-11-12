import { Component } from '@angular/core';
import { AbstractControl, ValidatorFn } from '@angular/forms';
import {
    BluiAuthSecurityService,
    SecurityContext,
    BluiAuthConfig,
    BluiAuthUIService,
} from '@brightlayer-ui/angular-auth-workflow';
import { LocalStorageService } from './services/localStorage.service';

@Component({
    selector: 'app-root',
    template: `<router-outlet></router-outlet>`,
})
export class AppComponent {
    constructor(
        private readonly bluiAuthUIService: BluiAuthUIService,
        private readonly bluiSecurityService: BluiAuthSecurityService,
        private readonly bluiAuthConfig: BluiAuthConfig,
        private readonly localStorageService: LocalStorageService
    ) {
        this._configureBluiAuthModule();
        this._listenForAuthStateChanges();
    }

    private _configureBluiAuthModule(): void {
        void this.bluiAuthUIService.initiateSecurity();
        this.bluiAuthConfig.projectImage = 'assets/images/eaton_stacked_logo.png';
        this.bluiAuthConfig.backgroundImage = 'assets/images/background.svg';
        this.bluiAuthConfig.allowDebugMode = true;
        this.bluiAuthConfig.languageCode = 'EN';
        this.bluiSecurityService.inferOnAuthenticatedRoute('');
        this.bluiAuthConfig.customEmailValidator = this._getCustomEmailValidator();
        this.bluiAuthConfig.customPasswordRequirements = [
            {
                regex: /^((?!password).)*$/,
                description: 'Does not contain "password"',
            },
        ];
        this.bluiAuthConfig.customFirstNameRequirements = {
            maxLength: 30,
        };
    }

    private _getCustomEmailValidator(): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } | null => {
            const forbidden = /test/i.test(control.value);
            return forbidden
                ? { Blui_LOGIN_VALIDATOR_ERROR_NAME: { message: 'This is a custom error, provided by end user' } }
                : null;
        };
    }

    // When a user transitions between being logged in / logged out, update session information.
    // This demo app stores session information in localStorage, this is just as a proof-of-concept.
    private _listenForAuthStateChanges(): void {
        this.bluiSecurityService.securityStateChanges().subscribe((state: SecurityContext) => {
            const email = state.rememberMeDetails.email;
            const rememberMe = state.rememberMeDetails.rememberMe;
            const isAuth = state.isAuthenticatedUser;
            this.localStorageService.setAuthData(rememberMe ? email : undefined, isAuth);
        });
    }
}
