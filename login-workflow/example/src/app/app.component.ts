import { Component } from '@angular/core';
import { PxbAuthSecurityService, PxbAuthConfig, SecurityContext } from '@pxblue/angular-auth-workflow';
import { LocalStorageService } from './services/localStorage.service';
import { NavigationStart, Router } from '@angular/router';
import {AUTH_ROUTE} from "./app.routing";

@Component({
    selector: 'app-root',
    template: `<router-outlet></router-outlet>`,
})
export class AppComponent {
    firstRouteCaptured = false;

    constructor(
        private router: Router,
        private readonly pxbSecurityService: PxbAuthSecurityService,
        private readonly pxbAuthConfig: PxbAuthConfig,
        private readonly localStorageService: LocalStorageService
    ) {
        this.listenForAuthStateChanges();
        this.listenForInitialRouteLoad();
    }

    // Whenever the application loads for the first time, we may want to direct the user to their original destination, before they were redirected to the login screen.
    private listenForInitialRouteLoad(): void {
        this.pxbSecurityService.initialRouteLoad().subscribe((event: NavigationStart) => {
          if (event.url.includes(AUTH_ROUTE) || event.url === '/') {
            this.pxbAuthConfig.homeRoute = 'home';
          } else {
            this.pxbAuthConfig.homeRoute = event.url;
          }
        });
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
