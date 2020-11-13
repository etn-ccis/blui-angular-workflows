import { Inject, Injectable } from '@angular/core';

export type AuthData = {
    email: string;
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

    constructor(@Inject('APP_NAME') APP_NAME) {
        this.emailKey = `${APP_NAME}_REMEMBER_ME_EMAIL`;
    }

    readAuthData(): AuthData {
        return { email: window.localStorage.getItem(this.emailKey) || '' };
    }

    setAuthData(email: string): void {
        window.localStorage.setItem(this.emailKey, email);
    }

    clearAuthData(): void {
        window.localStorage.removeItem(this.emailKey);
    }
}
