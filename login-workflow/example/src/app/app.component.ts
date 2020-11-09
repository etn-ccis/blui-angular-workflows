import { Component } from '@angular/core';
import {PxbSecurityService, SecurityContext} from "@pxblue/angular-auth-workflow";
import {LocalStorageService} from "./services/localStorage.service";

@Component({
    selector: 'app-root',
    template: `<router-outlet></router-outlet>`
})
export class AppComponent {

    constructor(readonly pxbSecurityService: PxbSecurityService,
                readonly localStorageService: LocalStorageService) {

      pxbSecurityService.securityStateChanges().subscribe((state: SecurityContext) => {
        if (state.isAuthenticatedUser && state.rememberMeDetails.rememberMe) {
          localStorageService.setAuthData(state.email);
        } else {
          localStorageService.clearAuthData();
        }
      })
    }
}
