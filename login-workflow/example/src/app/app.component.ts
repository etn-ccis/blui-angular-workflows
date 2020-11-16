import {Component} from '@angular/core';
import {PxbAuthSecurityService, SecurityContext} from '@pxblue/angular-auth-workflow';
import {LocalStorageService} from './services/localStorage.service';

@Component({
    selector: 'app-root',
    template: `<router-outlet></router-outlet>`,
})
export class AppComponent {
    constructor(
        private readonly pxbSecurityService: PxbAuthSecurityService,
        private readonly localStorageService: LocalStorageService
    ) {
        this.listenForAuthStateChanges();
    }

    // When a user transitions between being logged in / logged out, update session information.
    // This demo app stores session information in localStorage, just as a proof-of-concept.
    private listenForAuthStateChanges(): void {
        this.pxbSecurityService.securityStateChanges().subscribe((state: SecurityContext) => {
            if (state.isAuthenticatedUser && state.rememberMeDetails.rememberMe) {
                this.localStorageService.setAuthData(state.rememberMeDetails.email);
            } else {
                this.localStorageService.clearAuthData();
            }
        });
    }
}
