import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { NavigationStart, Router } from '@angular/router';
import { PxbAuthConfig } from '../../services/config/auth-config';
import { AUTH_ROUTE } from '../../auth/auth.routes';

export type SecurityContext = {
    /**
     * Email of the authenticated user.
     */
    email?: string;
    /**
     * UserId of the authenticated user (may be an email).
     */
    userId?: string;
    /**
     * Information for a user who wants to be remembered upon logout.
     */
    rememberMeDetails: {
        /**
         * Email address to show in the email field of Login after logout.
         */
        email?: string;
        /**
         * When true, the user's email will be in the email field of Login.
         */
        rememberMe?: boolean;
    };
    /**
     * True: The security state is being loaded (all other fields are invalid).
     * False: The security state has been loaded.
     */
    isLoading: boolean;
    /**
     * Message to display below the loading spinner.
     */
    loadingMessage: string;
    /**
     * Used for animation purposes only.
     * True: The user is logged in currently and a change will be the result of
     * logging out.
     * False: The user is likely logging in if authentication state changes.
     */
    isSignOut: boolean;
    /**
     * True: The user is authenticated and the application is shown (or the Change Password interface).
     * False: The user is not authenticated and the Authentication User Interface is shown.
     */
    isAuthenticatedUser: boolean;
};

export type RememberMeData = {
    user: string;
    rememberMe: boolean;
};

@Injectable({
    providedIn: 'root',
})
export class PxbAuthSecurityService {
    private readonly securityStateObs = new Subject<SecurityContext>();
    private isFirstRouteCaptured = false;
    private securityState: SecurityContext = {
        userId: undefined,
        email: undefined,
        rememberMeDetails: {
            email: undefined,
            rememberMe: undefined,
        },
        isAuthenticatedUser: false,
        isLoading: true,
        loadingMessage: undefined,
        isSignOut: false,
        isShowingChangePassword: false,
    };

    // Whenever the application loads for the first time, we may want to direct the user to their original destination, before they were redirected to the login screen.
    constructor(private readonly _router: Router, private readonly _pxbAuthConfig: PxbAuthConfig) {
        _router.events.subscribe((event) => {
            if (event instanceof NavigationStart && !this.isFirstRouteCaptured) {
                this.isFirstRouteCaptured = true;
                if (!event.url.includes(AUTH_ROUTE) || event.url === '/') {
                    this._pxbAuthConfig.homeRoute = event.url;
                }
            }
        });
    }

    updateSecurityState(newState: Partial<SecurityContext>): void {
        this.setSecurityState(Object.assign(this.getSecurityState(), newState));
    }

    setSecurityState(newSecurityState: SecurityContext): void {
        this.securityState = newSecurityState;
        this.securityStateObs.next(this.securityState);
    }

    getSecurityState(): SecurityContext {
        return this.securityState;
    }

    securityStateChanges(): Observable<SecurityContext> {
        return this.securityStateObs;
    }

    setLoading(isLoading: boolean): void {
        !isLoading ? this.clearLoadingMessage() : '';
        this.updateSecurityState({ isLoading });
    }

    setLoadingMessage(loadingMessage: string): void {
        this.updateSecurityState({ loadingMessage });
    }

    clearLoadingMessage(): void {
        this.updateSecurityState({ loadingMessage: undefined });
    }

    // If the user has been authenticated, this function should be called.
    onUserAuthenticated(email: string, password: string, rememberMe: boolean): void {
        this.setSecurityState({
            email,
            userId: email,
            isAuthenticatedUser: true,
            isLoading: false,
            rememberMeDetails: {
                email: rememberMe ? email : undefined,
                rememberMe,
            },
            loadingMessage: this.securityState.loadingMessage,
        });
    }

    // If the user has been de-authenticated (either because they logged out or app started with no credentials),
    onUserNotAuthenticated(rememberMeDetails?: RememberMeData): void {
        const currState = this.getSecurityState();
        const rememberMe = rememberMeDetails ? rememberMeDetails.rememberMe : currState.rememberMeDetails.rememberMe;
        const email = rememberMeDetails ? rememberMeDetails.user : currState.rememberMeDetails.email;
        this.setSecurityState(
            Object.assign(currState, {
                isAuthenticatedUser: false,
                isLoading: false,
                isSignOut: true,
                isShowingChangePassword: false,
                rememberMeDetails: {
                    rememberMe,
                    email,
                },
            })
        );
    }
}
