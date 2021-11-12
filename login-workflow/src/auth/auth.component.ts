import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BluiAuthConfig } from '../services/config/auth-config';
import { matchesRoute } from '../util/matcher';
import { BluiAuthUIService } from '../services/api';
import { BluiAuthSecurityService, SecurityContext } from '../services/state/auth-security.service';
import { BluiCreateAccountInviteComponent } from '../pages/create-account-invite/create-account-invite.component';
import { BluiCreateAccountComponent } from '../pages/create-account/create-account.component';
import { BluiLoginComponent } from '../pages/login/login.component';
import { BluiForgotPasswordComponent } from '../pages/forgot-password/forgot-password.component';
import { BluiContactSupportComponent } from '../pages/contact-support/contact-support.component';
import { BluiResetPasswordComponent } from '../pages/reset-password/reset-password.component';
import { Subscription } from 'rxjs';

@Component({
    selector: 'blui-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.scss'],
    host: {
        class: 'blui-auth',
    },
})
export class BluiAuthComponent implements OnInit, OnDestroy {
    @Input() createAccountInviteRef: TemplateRef<BluiCreateAccountInviteComponent>;
    @Input() createAccountRef: TemplateRef<BluiCreateAccountComponent>;
    @Input() loginRef: TemplateRef<BluiLoginComponent>;
    @Input() forgotPasswordRef: TemplateRef<BluiForgotPasswordComponent>;
    @Input() resetPasswordRef: TemplateRef<BluiResetPasswordComponent>;
    @Input() contactSupportRef: TemplateRef<BluiContactSupportComponent>;

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
        private readonly _bluiAuthConfig: BluiAuthConfig,
        private readonly _bluiAuthUIService: BluiAuthUIService,
        private readonly _changeDetectorRef: ChangeDetectorRef,
        private readonly _bluiSecurityService: BluiAuthSecurityService
    ) {
        this._listenForAuthLoadingStateChanges();
        this._listenForAuthRouteChanges();
    }

    ngOnInit(): void {
        this.initiateSecurity();
        this.projectImage = this._bluiAuthConfig.projectImage;
        this.backgroundImage = this._bluiAuthConfig.backgroundImage;
    }

    ngOnDestroy(): void {
        this.stateListener.unsubscribe();
        this.routeListener.unsubscribe();
    }

    initiateSecurity(): void {
        void this._bluiAuthUIService.initiateSecurity().then(() => {
            this.isSecurityInitiated = true;
            this._changeDetectorRef.detectChanges();
        });
    }

    // This will listen for auth state loading changes and toggles the shared overlay loading screen.
    private _listenForAuthLoadingStateChanges(): void {
        this.stateListener = this._bluiSecurityService
            .securityStateChanges()
            .subscribe((securityContext: SecurityContext) => {
                this.isLoading = securityContext.isLoading;
                this.loadingMessage = securityContext.loadingMessage;
                this._changeDetectorRef.detectChanges();
            });
    }

    // Observes route changes and determines which Blui Auth page to show via route name.
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
