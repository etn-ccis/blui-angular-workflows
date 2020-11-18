import { Inject, Injectable } from '@angular/core';

export type AuthData = {
    email: string;
    isAuthenticated: boolean;
};

/* This is a basic service used to demo session information stored in local storage.
   Other applications may use alternative ways to store session information
   and validate a user's authentication status.
 */
@Injectable({
    providedIn: 'root',
})
export class LocalStorageService {
    emailKey: string;
    isAuthKey: string;

    constructor(@Inject('APP_NAME') APP_NAME) {
        this.emailKey = `${APP_NAME}_REMEMBER_ME_EMAIL`;
        this.isAuthKey = `${APP_NAME}_IS_AUTH`;
    }

    readAuthData(): AuthData {
        return {
            email: window.localStorage.getItem(this.emailKey) || '',
            isAuthenticated: window.localStorage.getItem(this.isAuthKey) === 'true',
        };
    }

    setAuthData(rememberMeEmail: string, isAuth: boolean): void {
        if (rememberMeEmail) {
            window.localStorage.setItem(this.emailKey, rememberMeEmail);
        } else {
            window.localStorage.removeItem(this.emailKey);
        }

        if (isAuth) {
            window.localStorage.setItem(this.isAuthKey, String(isAuth));
        } else {
            window.localStorage.removeItem(this.isAuthKey);
        }
    }
}
