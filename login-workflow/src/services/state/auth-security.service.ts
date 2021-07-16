import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { NavigationStart, Router } from '@angular/router';
import { PxbAuthConfig } from '../../services/config/auth-config';
import { AUTH_ROUTES } from '../../auth/auth.routes';
import { matchesRoute } from '../../util/matcher';

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
     * True: The user is authenticated and the application is shown (or the Change Password interface).
     * False: The user is not authenticated and the Authentication User Interface is shown.
     */
    isAuthenticatedUser: boolean;
    /**
     * Save password during registration process
     */
    registrationPassword: string;
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
        registrationPassword: undefined,
    };

    // Whenever the application loads for the first time, we may want to direct the user to their original destination, before they were redirected to the login screen.
    constructor(private readonly _router: Router, private readonly _pxbAuthConfig: PxbAuthConfig) {}

    /* Call this method to parse the on-load URL to identify which page to redirect to when the user is authenticated.
       If `defaultHomeRoute` is provided, then this route will be used when unable to identify the default redirect route via URL.
     */
    inferOnAuthenticatedRoute(defaultHomeRoute?: string): void {
        this._router.events.subscribe((event) => {
            if (event instanceof NavigationStart && !this.isFirstRouteCaptured) {
                this.isFirstRouteCaptured = true;
                const url = event.url;

                const isAuthModuleRoute =
                    matchesRoute(url, 'LOGIN') ||
                    matchesRoute(url, 'CONTACT_SUPPORT') ||
                    matchesRoute(url, 'CREATE_ACCOUNT') ||
                    matchesRoute(url, 'CREATE_ACCOUNT_INVITE') ||
                    matchesRoute(url, 'FORGOT_PASSWORD') ||
                    matchesRoute(url, 'RESET_PASSWORD') ||
                    matchesRoute(url, 'AUTH_WORKFLOW');
                const isEmptyRoute = !url || url === '' || url === '/';

                // If there is no information
                if ((isEmptyRoute || isAuthModuleRoute) && defaultHomeRoute) {
                    AUTH_ROUTES.ON_AUTHENTICATED = defaultHomeRoute;
                    return;
                }

                // If the initial route loaded is not part of the auth workflow, make it so authenticated users will redirect to it post-login.
                if (!isAuthModuleRoute) {
                    AUTH_ROUTES.ON_AUTHENTICATED = event.url;
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
            registrationPassword: undefined,
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
                isShowingChangePassword: false,
                rememberMeDetails: {
                    rememberMe,
                    email,
                },
            })
        );
    }
}
