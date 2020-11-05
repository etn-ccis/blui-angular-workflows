import { Injectable } from '@angular/core';
import { IPxbAuthApiService, PxbSecurityApiService } from '@pxblue/angular-auth-workflow';
import { LocalStorageService } from './localStorage.service';

const sleep = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms));
@Injectable({
    providedIn: 'root',
})
export class AuthService implements IPxbAuthApiService {

    constructor(
        private readonly _localStorageService: LocalStorageService,
        private readonly _securityApiService: PxbSecurityApiService
        ) {}
    
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

    async initiateSecurity(): Promise<any> {
        let authData;

        try {
            await sleep(2000);
            authData = await this._localStorageService.readAuthData();
        } catch (e) {
            // Restoring token failed
        }

        // After restoring token, we may need to validate it in production apps
        // This will switch to the App screen or Auth screen.
        // PxbSecurityApiService.onUserAuthenticated()
        if (authData?.email !== undefined) {
            // @TODO: remove this later
            // eslint-disable-next-line no-console
            console.log('we have an email in local storage!', authData);

            this._securityApiService.onUserAuthenticated({
                email: authData?.email,
                userId: authData.userId ?? '',
                rememberMe: authData?.rememberMeData.rememberMe,
            });
        } else {
            // @TODO: remove this later
            // eslint-disable-next-line no-console
            console.log('we have no email in local storage!', authData);

            const rememberMeEmail = authData?.rememberMeData.rememberMe ? authData?.rememberMeData.user : undefined;
            this._securityApiService.onUserNotAuthenticated(false, rememberMeEmail, authData?.rememberMeData);
        }
    }
    
}
