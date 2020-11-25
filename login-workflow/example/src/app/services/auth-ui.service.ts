/* eslint-disable no-console */
import { Injectable } from '@angular/core';
import { IPxbAuthUIService, PxbAuthSecurityService } from '@pxblue/angular-auth-workflow';
import { LocalStorageService } from './localStorage.service';

const TIMEOUT_MS = 1500;

@Injectable({
    providedIn: 'root',
})
export class AuthUIService implements IPxbAuthUIService {
    constructor(
        private readonly _localStorageService: LocalStorageService,
        private readonly _pxbSecurityService: PxbAuthSecurityService
    ) {}

    // This method is called at the start of the application to check if a remembered user is returning to the app and initiate pxb SecurityContext.
    initiateSecurity(): Promise<void> {
        return new Promise((resolve) => {
            setTimeout(() => {
                const authData = this._localStorageService.readAuthData();
                if (authData.isAuthenticated) {
                    console.log('User is authenticated.');
                    this._pxbSecurityService.onUserAuthenticated(authData.email, undefined, true);
                    return resolve();
                } else if (authData.email) {
                    console.log('User is not authenticated, but we have remembered their Email.');
                    this._pxbSecurityService.onUserNotAuthenticated({ rememberMe: true, user: authData.email });
                } else {
                    console.log('User is not authenticated and not remembered.');
                    this._pxbSecurityService.onUserNotAuthenticated();
                }
                return resolve();
            }, TIMEOUT_MS);
        });
    }

    login(email: string, password: string, rememberMe: boolean): Promise<void> {
        console.log(
            `Performing a sample Login request with the following credentials:\n  email: ${email} \n  password: ${password} \n  rememberMe: ${rememberMe}`
        );
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (password.toLowerCase() === 'fail') {
                    return reject();
                }
                return resolve();
            }, TIMEOUT_MS);
        });
    }

    forgotPassword(email: string): Promise<void> {
        console.log(`Performing a sample ForgotPassword request with the following credentials:\n email: ${email}`);
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (email.toLowerCase() === 'fail@test.com') {
                    return reject();
                }
                return resolve();
            }, TIMEOUT_MS);
        });
    }

    changePassword(oldPassword: string, newPassword: string): Promise<void> {
        console.log(
            `Performing a sample ChangePassword request with the following credentials.\n  oldPassword: ${oldPassword}\n  newPassword: ${newPassword}`
        );
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (newPassword.toLowerCase() === 'fail123!') {
                    return reject({
                        title: 'Error!',
                        message: 'This is an example of a custom error message.',
                    });
                }
                return resolve();
            }, TIMEOUT_MS);
        });
    }

    verifyResetCode(): Promise<void> {
        const urlParams = new URLSearchParams(window.location.search);
        const resetCode = urlParams.get('code');
        console.log(`Performing a sample verifyResetCode request with the following credentials:\n code: ${resetCode}`);
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (!resetCode || resetCode.toUpperCase() === 'INVALID_LINK') {
                    return reject();
                }
                return resolve();
            }, 1000);
        });
    }

    setPassword(password: string): Promise<void> {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');
        const email = urlParams.get('email');

        console.log(
            `Performing a sample SetPassword request with the following credentials.\n  code: ${code}\n  password: ${password}\n  email: ${email}`
        );

        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (password.toLowerCase() === 'fail123!') {
                    return reject();
                }
                return resolve();
            }, TIMEOUT_MS);
        });
    }
}
