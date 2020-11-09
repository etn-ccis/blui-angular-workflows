import {
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    ElementRef,
    Inject,
    Input,
    OnInit,
    ViewChild,
} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { PXB_AUTH_CONFIG, PxbAuthConfig } from '../config/auth-config';
import {
    CONTACT_SUPPORT_ROUTE,
    CREATE_ACCOUNT_INVITE_ROUTE,
    CREATE_ACCOUNT_ROUTE,
    FORGOT_PASSWORD_ROUTE,
    LOGIN_ROUTE,
    RESET_PASSWORD_ROUTE,
} from '../config/route-names';
import { isEmptyView } from '../util/view-utils';
import { PxbAuthUIActionsService, PxbSecurityService } from '../services/public-api';

@Component({
    selector: 'pxb-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.scss'],
})
export class PxbAuthComponent implements AfterViewInit, OnInit {
    @ViewChild('login', { static: false }) loginEl: ElementRef;
    @ViewChild('resetPassword', { static: false }) resetPasswordEl: ElementRef;
    @ViewChild('createAccount', { static: false }) createAccountEl: ElementRef;
    @ViewChild('createAccountInvite', { static: false }) createAccountInviteEl: ElementRef;
    @ViewChild('forgotPassword', { static: false }) forgotPasswordEl: ElementRef;
    @ViewChild('contactSupport', { static: false }) contactSupportEl: ElementRef;
    @Input() backgroundImage: string;
    projectImage: string;

    isEmpty = (el: ElementRef): boolean => isEmptyView(el);

    showLogin: boolean;
    showForgotPassword: boolean;
    showCreateAccount: boolean;
    showCreateAccountInvite: boolean;
    showResetPassword: boolean;
    showContactSupport: boolean;
    isSecurityInitiated = false;

    constructor(
        public router: Router,
        private readonly _changeDetectorRef: ChangeDetectorRef,
        private readonly _authUIActionsService: PxbAuthUIActionsService,
        private readonly _securityService: PxbSecurityService,
        @Inject(PXB_AUTH_CONFIG) private readonly _config: PxbAuthConfig
    ) {
        router.events.subscribe((route) => {
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

    ngOnInit(): void {
        this.projectImage = this._config.projectImage;
        this.initiateSecurity();

        // logs user in if they are already authenticated
        this._securityService.securityStateChanges().subscribe((res) => {
            if (res.isAuthenticatedUser) {
                //   this._authStateService.setAuthenticated(true);
                void this.router.navigate([this._config.homeRoute]);
            }
        });

        this._changeDetectorRef.detectChanges();
    }

    ngAfterViewInit(): void {
        this._changeDetectorRef.detectChanges();
        this._changeDetectorRef.detectChanges();
    }

    initiateSecurity(): void {
        this._authUIActionsService
            .initiateSecurity()
            .then(() => {
                this.isSecurityInitiated = true;
            })
            .catch(() => {});
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
        const potentialAuthRoute = `/${this._config.authRoute}/${targetRoute}`;
        return route.urlAfterRedirects === potentialAuthRoute;
    }
}
