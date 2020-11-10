import { Component } from '@angular/core';
import { PxbAuthSecurityService, SecurityContext } from '@pxblue/angular-auth-workflow';
import { LocalStorageService } from './services/localStorage.service';

@Component({
    selector: 'app-root',
    template: `<router-outlet></router-outlet>`,
})
export class AppComponent {
    constructor(readonly pxbSecurityService: PxbAuthSecurityService, readonly localStorageService: LocalStorageService) {
        // App Component listens for PXB auth state changes.
        pxbSecurityService.securityStateChanges().subscribe((state: SecurityContext) => {
            if (state.isAuthenticatedUser && state.rememberMeDetails.rememberMe) {
              localStorageService.setAuthData(state.rememberMeDetails.email);
            } else {
                localStorageService.clearAuthData();
            }
        });
    }
}
