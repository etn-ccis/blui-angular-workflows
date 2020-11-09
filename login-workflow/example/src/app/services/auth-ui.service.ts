/* eslint-disable no-console */
import { Injectable } from '@angular/core';
import { IPxbAuthUIActionsService, PxbSecurityService } from '@pxblue/angular-auth-workflow';
import { AuthData, LocalStorageService } from './localStorage.service';

const sleep = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms));
@Injectable({
    providedIn: 'root',
})
export class AuthUIService implements IPxbAuthUIActionsService {
    constructor(
        private readonly _localStorageService: LocalStorageService,
        private readonly _pxbSecurityService: PxbSecurityService
    ) {}

    async initiateSecurity(): Promise<any> {
        let authData: AuthData;
        await sleep(1000);
        authData = await this._localStorageService.readAuthData();
        if (authData.email) {
            console.log('We have an email in local storage, authenticating the user.');
            // Session information is normally validated via an api; this is just an example.
            this._pxbSecurityService.onUserAuthenticated(authData.email, undefined, true);
        } else {
            console.log('User is not authenticated.');
            this._pxbSecurityService.onUserNotAuthenticated();
        }
        return Promise.resolve();
    }

    async login(email: string, password: string, rememberMe: boolean): Promise<void> {
        console.log(
            `Performing a sample Login with the following credentials:\n  email: ${email} \n  password: ${password} \n  rememberMe: ${rememberMe}`
        );
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (password === 'fail') {
                    return reject('The Login API request has failed.');
                }
                return resolve();
            }, 1500);
        });
    }

    async forgotPassword(email: string): Promise<void> {
        console.log(`Performing a sample ForgotPassword request with the following credentials:\n email: ${email}`);
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (email === 'fail@test.com') {
                    return reject('The ForgotPassword API request has failed.');
                }
                return resolve();
            }, 1000);
        });
    }

    async changePassword(oldPassword: string, newPassword: string): Promise<void> {
        console.log(
            `Performing a sample ChangePassword request with the following credentials.\n  oldPassword: ${oldPassword}\n  newPassword: ${newPassword}`
        );
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (newPassword === 'fail') {
                    return reject('The ChangePassword API request has failed.');
                }
                return resolve();
            }, 1000);
        });
    }

    async setPassword(code: string, password: string, email?: string): Promise<void> {
        console.log(
            `Performing a sample SetPassword request with the following credentials.\n  code: ${code}\n  password: ${password}\n  email: ${email}`
        );
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (password === 'fail') {
                    return reject('The SetPassword API request has failed.');
                }
                return resolve();
            }, 1000);
        });
    }
}
