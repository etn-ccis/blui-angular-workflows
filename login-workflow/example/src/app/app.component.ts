import { Component } from '@angular/core';
import { PxbAuthSecurityService, SecurityContext, PxbAuthConfig, AUTH_ROUTES } from '@pxblue/angular-auth-workflow';
import { LocalStorageService } from './services/localStorage.service';

@Component({
    selector: 'app-root',
    template: `<router-outlet></router-outlet>`,
})
export class AppComponent {
    constructor(
        private readonly pxbSecurityService: PxbAuthSecurityService,
        private readonly localStorageService: LocalStorageService,
        private readonly pxbAuthConfig: PxbAuthConfig
    ) {
        this._configurePxbAuthModule();
        this._listenForAuthStateChanges();
    }

    private _configurePxbAuthModule(): void {
        this.pxbAuthConfig.projectImage = 'assets/images/eaton_stacked_logo.png';
        this.pxbAuthConfig.backgroundImage = 'assets/images/background.svg';
        this.pxbAuthConfig.allowDebugMode = true;
        this.pxbAuthConfig.showCreateAccount = false;
        this.pxbAuthConfig.passwordRequirements.push({
            regex: /^((?!password).)*$/,
            description: 'Does not contain "password"',
        });
        // If the ON_AUTHENTICATED route is not pre-populated by PXB auth workflow, provide it below.
        if (!AUTH_ROUTES.ON_AUTHENTICATED || AUTH_ROUTES.ON_AUTHENTICATED === '/') {
            AUTH_ROUTES.ON_AUTHENTICATED = 'home';
        }
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
