/* eslint-disable @typescript-eslint/no-unused-vars */

import { Injectable } from '@angular/core';

/* Authentication Actions to be performed based on the user's UI actions. */
export type IBluiAuthUIService = {
    /**
     * Initialize the application security state. This will involve reading any local storage,
     * validating existing credentials (token expiration, for example). At the end of validation,
     * the [[SecurityUiService]] should be called with either:
     * [[onUserAuthenticated]] (which will present the application), or
     * [[onUserNotAuthenticated]] (which will present the Auth UI).
     *
     * Note: Until this method returns, the applications Splash screen will be presented.
     *
     * @returns Should always resolve. Never throw.
     */
    initiateSecurity(): Promise<void>;

    // The user wants to log into the application
    login(email: string, password: string, rememberMe: boolean): Promise<void>;

    // The user has forgotten their password and wants help. The application generally should call an API which will then send a password reset link to the user's email.
    forgotPassword(email: string): Promise<void>;

    // An authenticated user wants to change their password.
    changePassword(oldPassword: string, newPassword: string): Promise<void>;

    /**
     * The user has tapped on an email with a password reset link, which they received after
     * requesting help for forgetting their password.
     * The application should take the password reset code and then verify that it is still
     * valid.
     */
    verifyResetCode(): Promise<void>;

    // A user who has previously used "forgotPassword" now has a valid password reset code and has entered a new password.
    setPassword(password: string): Promise<void>;
};

@Injectable({
    providedIn: 'root',
})
export class BluiAuthUIService implements IBluiAuthUIService {
    warn(): void {
        /* eslint-disable no-console */
        console.warn('You need to provide your own BluiAuthUIActionsService');
    }

    login(email: string, password: string, rememberMe: boolean): Promise<void> {
        this.warn();
        return undefined;
    }

    forgotPassword(email: string): Promise<void> {
        this.warn();
        return undefined;
    }

    changePassword(oldPassword: string, newPassword: string): Promise<void> {
        this.warn();
        return undefined;
    }

    verifyResetCode(): Promise<void> {
        this.warn();
        return undefined;
    }

    setPassword(password: string): Promise<void> {
        this.warn();
        return undefined;
    }

    initiateSecurity(): Promise<void> {
        this.warn();
        return undefined;
    }
}
