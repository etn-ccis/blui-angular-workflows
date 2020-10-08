import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Inject, Input, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { PXB_AUTH_CONFIG, PxbAuthConfig } from '../config/auth-config';
import { CONTACT_SUPPORT_ROUTE, CREATE_ACCOUNT_ROUTE, FORGOT_PASSWORD_ROUTE, LOGIN_ROUTE, RESET_PASSWORD_ROUTE } from '../config/route-names';
import { isEmptyView } from '../util/view-utils';

@Component({
    selector: 'pxb-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.scss'],
})
export class PxbAuthComponent implements AfterViewInit {
    @ViewChild('login', { static: false }) loginEl: ElementRef;
    @ViewChild('resetPassword', { static: false }) resetPasswordEl: ElementRef;
    @ViewChild('createAccount', { static: false }) createAccountEl: ElementRef;
    @ViewChild('forgotPassword', { static: false }) forgotPasswordEl: ElementRef;
    @ViewChild('contactSupport', { static: false }) contactSupportEl: ElementRef;
    @Input() backgroundImage: string;

    isEmpty = (el: ElementRef): boolean => isEmptyView(el);

    showLogin: boolean;
    showForgotPassword: boolean;
    showCreateAccount: boolean;
    showResetPassword: boolean;
    showContactSupport: boolean;

    constructor(
        router: Router,
        private readonly _changeDetectorRef: ChangeDetectorRef,
        @Inject(PXB_AUTH_CONFIG) private readonly _config: PxbAuthConfig
    ) {
        router.events.subscribe((route) => {
            if (route instanceof NavigationEnd) {
                this.resetSelectedRoute();
                this.showLogin = this.matches(route, LOGIN_ROUTE);
                this.showCreateAccount = this.matches(route, CREATE_ACCOUNT_ROUTE);
                this.showForgotPassword = this.matches(route, FORGOT_PASSWORD_ROUTE);
                this.showResetPassword = this.matches(route, RESET_PASSWORD_ROUTE);
                this.showContactSupport = this.matches(route, CONTACT_SUPPORT_ROUTE);
                this._changeDetectorRef.detectChanges();
            }
        });
    }

    ngAfterViewInit(): void {
        this._changeDetectorRef.detectChanges();
    }

    resetSelectedRoute(): void {
        this.showLogin = false;
        this.showForgotPassword = false;
        this.showCreateAccount = false;
        this.showResetPassword = false;
        this.showContactSupport = false;
    }

    matches(route: NavigationEnd, targetRoute: string): boolean {
        const potentialAuthRoute = `/${this._config.authRoute}/${targetRoute}`;
        return route.urlAfterRedirects === potentialAuthRoute;
    }
}
