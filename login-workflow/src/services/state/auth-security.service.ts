import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

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
    /**
     * True: The Change Password screen is currently visible.
     * False: The Change Password screen is not currently visible.
     */
    isShowingChangePassword: boolean;
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
    private securityState: SecurityContext = {
        userId: undefined,
        email: undefined,
        rememberMeDetails: {
            email: undefined,
            rememberMe: undefined,
        },
        isAuthenticatedUser: false,
        isLoading: true,
        isSignOut: false,
        isShowingChangePassword: false,
    };

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

    // If the user has been authenticated, this function should be called.
    onUserAuthenticated(email: string, password: string, rememberMe: boolean): void {
        this.setSecurityState({
            email,
            userId: email,
            isAuthenticatedUser: true,
            isLoading: false,
            isSignOut: false,
            isShowingChangePassword: false,
            rememberMeDetails: {
                email: rememberMe ? email : undefined,
                rememberMe,
            },
        });
    }

    // If the user has been de-authenticated (either because they logged out or app started with no credentials),
    onUserNotAuthenticated(): void {
        const currState = this.getSecurityState();
        this.setSecurityState(
            Object.assign(currState, {
                email: currState.email,
                isAuthenticatedUser: false,
                isLoading: false,
                isSignOut: true,
                isShowingChangePassword: false,
            })
        );
    }
}
