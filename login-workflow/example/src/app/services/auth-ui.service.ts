/* eslint-disable no-console */
import { Injectable } from '@angular/core';
import { IPxbAuthUIService, PxbAuthSecurityService } from '@pxblue/angular-auth-workflow';
import { AuthData, LocalStorageService } from './localStorage.service';

const sleep = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms));
@Injectable({
    providedIn: 'root',
})
export class AuthUIService implements IPxbAuthUIService {
    constructor(
        private readonly _localStorageService: LocalStorageService,
        private readonly _pxbSecurityService: PxbAuthSecurityService
    ) {}

    // This method is called at the start of the application to check if a remembered user is returning to the app and initiate pxb SecurityContext.
    async initiateSecurity(): Promise<any> {
        let authData: AuthData;
        return new Promise((resolve) => {
            setTimeout(() => {
                authData = this._localStorageService.readAuthData();
                if (authData.email) {
                    console.log('We have an email in local storage, providing Remember Me details.');
                    const state = this._pxbSecurityService.getSecurityState();
                    this._pxbSecurityService.setSecurityState(
                        Object.assign(state, {
                            rememberMeDetails: {
                                email: authData.email,
                                rememberMe: true,
                            },
                        })
                    );
                } else {
                    console.log('User is not authenticated.');
                    this._pxbSecurityService.onUserNotAuthenticated();
                }
                return resolve();
            }, 1000);
        });
    }

    async login(email: string, password: string, rememberMe: boolean): Promise<void> {
        console.log(
            `Performing a sample Login with the following credentials:\n  email: ${email} \n  password: ${password} \n  rememberMe: ${rememberMe}`
        );
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (password.toLowerCase() === 'fail') {
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
                if (email.toLowerCase() === 'fail@test.com') {
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
                if (newPassword.toLowerCase() === 'fail123!') {
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
