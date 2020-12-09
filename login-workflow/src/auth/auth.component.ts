import { ChangeDetectorRef, Component, ElementRef, Input, OnInit, TemplateRef } from '@angular/core';
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
import { PxbCreateAccountInviteComponent } from '../pages/create-account-invite/create-account-invite.component';
import { PxbCreateAccountComponent } from '../pages/create-account/create-account.component';
import { PxbLoginComponent } from '../pages/login/login.component';
import { PxbForgotPasswordComponent } from '../pages/forgot-password/forgot-password.component';
import { PxbContactSupportComponent } from '../pages/contact-support/contact-support.component';
import { PxbResetPasswordComponent } from '../pages/reset-password/reset-password.component';

@Component({
    selector: 'pxb-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.scss'],
    host: {
        class: 'pxb-auth',
    },
})
export class PxbAuthComponent implements OnInit {
    @Input() createAccountInviteRef: TemplateRef<PxbCreateAccountInviteComponent>;
    @Input() createAccountRef: TemplateRef<PxbCreateAccountComponent>;
    @Input() loginRef: TemplateRef<PxbLoginComponent>;
    @Input() forgotPasswordRef: TemplateRef<PxbForgotPasswordComponent>;
    @Input() resetPasswordRef: TemplateRef<PxbResetPasswordComponent>;
    @Input() contactSupportRef: TemplateRef<PxbContactSupportComponent>;

    projectImage: string;
    backgroundImage: string;

    isEmpty = (el: ElementRef): boolean => isEmptyView(el);

    showLogin: boolean;
    showCreateAccount: boolean;
    showResetPassword: boolean;
    showContactSupport: boolean;
    showForgotPassword: boolean;
    showCreateAccountInvite: boolean;

    isLoading = false;
    loadingMessage: string;
    isSecurityInitiated = false;

    constructor(
        private readonly _router: Router,
        private readonly _pxbAuthConfig: PxbAuthConfig,
        private readonly _pxbAuthUIService: PxbAuthUIService,
        private readonly _changeDetectorRef: ChangeDetectorRef,
        private readonly _pxbSecurityService: PxbAuthSecurityService
    ) {
        this._listenForAuthLoadingStateChanges();
        this._listenForAuthRouteChanges();
    }

    ngOnInit(): void {
        this.initiateSecurity();
        this.projectImage = this._pxbAuthConfig.projectImage;
        this.backgroundImage = this._pxbAuthConfig.backgroundImage;

        this._pxbSecurityService.securityStateChanges().subscribe((securityContext: SecurityContext) => {
            this.loadingMessage = securityContext.loadingMessage;
        });
    }

    initiateSecurity(): void {
        void this._pxbAuthUIService.initiateSecurity().then(() => {
            this.isSecurityInitiated = true;
            this._changeDetectorRef.detectChanges();
        });
    }

    matches(route: NavigationEnd, targetRoute: string): boolean {
        const potentialAuthRoute = `/${this._pxbAuthConfig.authRoute}/${targetRoute}`;
        return route.urlAfterRedirects.split('?')[0] === potentialAuthRoute;
    }

    // This will listen for auth state loading changes and toggles the shared overlay loading screen.
    private _listenForAuthLoadingStateChanges(): void {
        this._pxbSecurityService.securityStateChanges().subscribe((state: SecurityContext) => {
            this.isLoading = state.isLoading;
            this._changeDetectorRef.detectChanges();
        });
    }

    // Observes route changes and determines which PXB Auth page to show via route name.
    private _listenForAuthRouteChanges(): void {
        this._router.events.subscribe((route) => {
            if (route instanceof NavigationEnd) {
                this._resetSelectedRoute();
                this.showLogin = this.matches(route, LOGIN_ROUTE);
                this.showResetPassword = this.matches(route, RESET_PASSWORD_ROUTE);
                this.showCreateAccount = this.matches(route, CREATE_ACCOUNT_ROUTE);
                this.showForgotPassword = this.matches(route, FORGOT_PASSWORD_ROUTE);
                this.showContactSupport = this.matches(route, CONTACT_SUPPORT_ROUTE);
                this.showCreateAccountInvite = this.matches(route, CREATE_ACCOUNT_INVITE_ROUTE);
                this._changeDetectorRef.detectChanges();
            }
        });
    }

    private _resetSelectedRoute(): void {
        this.showLogin = false;
        this.showForgotPassword = false;
        this.showCreateAccount = false;
        this.showCreateAccountInvite = false;
        this.showResetPassword = false;
        this.showContactSupport = false;
    }
}
