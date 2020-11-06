import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

// @TODO: move these types to a more appropriate place?

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
export class PxbSecurityService {
    securityState: SecurityContext = {
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

    securityStateObs = new Subject<SecurityContext>();

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

    onUserAuthenticated(email: string, userId: string, rememberMe: boolean): void {
        // @TODO: remove this later
        // eslint-disable-next-line no-console
        console.log('user authenticated with args: ', email, userId, rememberMe);

        const updatedSecurityState = {
            email, userId,
            rememberMeDetails: {
                email: rememberMe ? email : undefined,
                rememberMe,
            },
            isLoading: false,
            isSignOut: false,
            isAuthenticatedUser: true,
            isShowingChangePassword: false,
        };

        this.setSecurityState(updatedSecurityState);
    }

    onUserNotAuthenticated(
        clearRememberMe?: boolean,
        overrideRememberMeEmail?: string,
        rememberMeData?: RememberMeData
    ): void {
        // @TODO: remove this later
        // eslint-disable-next-line no-console
        console.log(
            'user not authenticated with clearRememberMe=',
            clearRememberMe,
            ' and overrideRememberMeEmail=',
            overrideRememberMeEmail
        );

        const overrideExists = (overrideRememberMeEmail?.length ?? 0) > 0;
        let rememberEmail = rememberMeData.user;
        let rememberMe = rememberMeData.rememberMe;
        if (overrideExists) {
            rememberEmail = overrideRememberMeEmail;
            rememberMe = true;
        } else if (clearRememberMe) {
            rememberEmail = undefined;
            rememberMe = false;
        }

        const updatedSecurityState = {
            email: undefined,
            userId: undefined,
            rememberMeDetails: {
                email: rememberEmail,
                rememberMe: rememberMe,
            },
            isLoading: false,
            isSignOut: true,
            isAuthenticatedUser: false,
            isShowingChangePassword: false,
        };

        this.setSecurityState(updatedSecurityState);
    }
}
