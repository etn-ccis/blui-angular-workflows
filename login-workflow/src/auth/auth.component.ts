import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { PxbAuthConfig } from '../services/config/auth-config';
import { isEmptyView } from '../util/view-utils';
import {
    CONTACT_SUPPORT_ROUTE,
    CREATE_ACCOUNT_INVITE_ROUTE,
    CREATE_ACCOUNT_ROUTE,
    FORGOT_PASSWORD_ROUTE,
    LOGIN_ROUTE,
    RESET_PASSWORD_ROUTE,
} from './auth.routes';
import { PxbAuthUIService } from '../services/api/auth-ui.service';
import { PxbAuthSecurityService, SecurityContext } from '../services/state/auth-security.service';

@Component({
    selector: 'pxb-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.scss'],
})
export class PxbAuthComponent implements OnInit {
    @ViewChild('login', { static: false }) loginEl: ElementRef;
    @ViewChild('resetPassword', { static: false }) resetPasswordEl: ElementRef;
    @ViewChild('createAccount', { static: false }) createAccountEl: ElementRef;
    @ViewChild('createAccountInvite', { static: false }) createAccountInviteEl: ElementRef;
    @ViewChild('forgotPassword', { static: false }) forgotPasswordEl: ElementRef;
    @ViewChild('contactSupport', { static: false }) contactSupportEl: ElementRef;

    backgroundImage: string;
    projectImage: string;

    isEmpty = (el: ElementRef): boolean => isEmptyView(el);

    showLogin: boolean;
    showForgotPassword: boolean;
    showCreateAccount: boolean;
    showCreateAccountInvite: boolean;
    showResetPassword: boolean;
    showContactSupport: boolean;
    isSecurityInitiated = false;
    isLoading = false;

    constructor(
        private readonly _router: Router,
        private readonly _pxbAuthConfig: PxbAuthConfig,
        private readonly _pxbAuthUIService: PxbAuthUIService,
        private readonly _changeDetectorRef: ChangeDetectorRef,
        private readonly _pxbSecurityService: PxbAuthSecurityService
    ) {
        this.listenForAuthLoadingStateChanges();
        this.listenForAuthRouteChanges();
    }

    ngOnInit(): void {
        this.backgroundImage = this._pxbAuthConfig.backgroundImage;
        this.projectImage = this._pxbAuthConfig.projectImage;
        this.initiateSecurity();

        // logs user in if they are already authenticated
        this._pxbSecurityService.securityStateChanges().subscribe((state) => {
            if (state.isAuthenticatedUser) {
                // TODO: This homeRoute has to be provided by the end user.
                void this._router.navigate([this._pxbAuthConfig.homeRoute]);
            }
        });
    }

    initiateSecurity(): void {
        void this._pxbAuthUIService.initiateSecurity().then(() => {
            this.isSecurityInitiated = true;
            this._changeDetectorRef.detectChanges();
        });
    }

    resetSelectedRoute(): void {
        this.showLogin = false;
        this.showForgotPassword = false;
        this.showCreateAccount = false;
        this.showCreateAccountInvite = false;
        this.showResetPassword = false;
        this.showContactSupport = false;
    }

    matches(route: NavigationEnd, targetRoute: string): boolean {
        const potentialAuthRoute = `/${this._pxbAuthConfig.authRoute}/${targetRoute}`;
        return route.urlAfterRedirects === potentialAuthRoute;
    }

    // This will listen for auth state loading changes and show a loading screen.
    private listenForAuthLoadingStateChanges(): void {
        this._pxbSecurityService
            .securityStateChanges()
            .subscribe((state: SecurityContext) => (this.isLoading = state.isLoading));
    }

    // Observes route changes and  determines which PXB Auth page to show via route name.
    private listenForAuthRouteChanges(): void {
        this._router.events.subscribe((route) => {
            if (route instanceof NavigationEnd) {
                this.resetSelectedRoute();
                this.showLogin = this.matches(route, LOGIN_ROUTE);
                this.showCreateAccount = this.matches(route, CREATE_ACCOUNT_ROUTE);
                this.showCreateAccountInvite = this.matches(route, CREATE_ACCOUNT_INVITE_ROUTE);
                this.showForgotPassword = this.matches(route, FORGOT_PASSWORD_ROUTE);
                this.showResetPassword = this.matches(route, RESET_PASSWORD_ROUTE);
                this.showContactSupport = this.matches(route, CONTACT_SUPPORT_ROUTE);
                this._changeDetectorRef.detectChanges();
            }
        });
    }
}
