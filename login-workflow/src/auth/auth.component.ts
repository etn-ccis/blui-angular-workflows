import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { PxbAuthConfig } from '../services/config/auth-config';
import { matchesRoute } from '../util/matcher';
import { PxbAuthUIService } from '../services/api';
import { PxbAuthSecurityService, SecurityContext } from '../services/state/auth-security.service';
import { PxbCreateAccountInviteComponent } from '../pages/create-account-invite/create-account-invite.component';
import { PxbCreateAccountComponent } from '../pages/create-account/create-account.component';
import { PxbLoginComponent } from '../pages/login/login.component';
import { PxbForgotPasswordComponent } from '../pages/forgot-password/forgot-password.component';
import { PxbContactSupportComponent } from '../pages/contact-support/contact-support.component';
import { PxbResetPasswordComponent } from '../pages/reset-password/reset-password.component';
import { Subscription } from 'rxjs';

@Component({
    selector: 'pxb-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.scss'],
    host: {
        class: 'pxb-auth',
    },
})
export class PxbAuthComponent implements OnInit, OnDestroy {
    @Input() createAccountInviteRef: TemplateRef<PxbCreateAccountInviteComponent>;
    @Input() createAccountRef: TemplateRef<PxbCreateAccountComponent>;
    @Input() loginRef: TemplateRef<PxbLoginComponent>;
    @Input() forgotPasswordRef: TemplateRef<PxbForgotPasswordComponent>;
    @Input() resetPasswordRef: TemplateRef<PxbResetPasswordComponent>;
    @Input() contactSupportRef: TemplateRef<PxbContactSupportComponent>;

    projectImage: string;
    backgroundImage: string;

    showLogin: boolean;
    showCreateAccount: boolean;
    showResetPassword: boolean;
    showContactSupport: boolean;
    showForgotPassword: boolean;
    showCreateAccountInvite: boolean;

    isLoading = false;
    loadingMessage: string;
    isSecurityInitiated = false;

    stateListener: Subscription;
    routeListener: Subscription;

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
    }

    ngOnDestroy(): void {
        this.stateListener.unsubscribe();
        this.routeListener.unsubscribe();
    }

    initiateSecurity(): void {
        void this._pxbAuthUIService.initiateSecurity().then(() => {
            this.isSecurityInitiated = true;
            this._changeDetectorRef.detectChanges();
        });
    }

    // This will listen for auth state loading changes and toggles the shared overlay loading screen.
    private _listenForAuthLoadingStateChanges(): void {
        this.stateListener = this._pxbSecurityService
            .securityStateChanges()
            .subscribe((securityContext: SecurityContext) => {
                this.isLoading = securityContext.isLoading;
                this.loadingMessage = securityContext.loadingMessage;
                this._changeDetectorRef.detectChanges();
            });
    }

    // Observes route changes and determines which PXB Auth page to show via route name.
    private _listenForAuthRouteChanges(): void {
        this.routeListener = this._router.events.subscribe((route) => {
            if (route instanceof NavigationEnd) {
                this._resetSelectedRoute();
                const url = route.urlAfterRedirects;
                this.showLogin = matchesRoute(url, 'LOGIN');
                this.showResetPassword = matchesRoute(url, 'RESET_PASSWORD');
                this.showCreateAccount = matchesRoute(url, 'CREATE_ACCOUNT');
                this.showForgotPassword = matchesRoute(url, 'FORGOT_PASSWORD');
                this.showContactSupport = matchesRoute(url, 'CONTACT_SUPPORT');
                this.showCreateAccountInvite = matchesRoute(url, 'CREATE_ACCOUNT_INVITE');
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
