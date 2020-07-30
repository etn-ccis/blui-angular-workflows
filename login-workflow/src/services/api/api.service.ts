import { Injectable } from '@angular/core';

export type IPxbAuthApiService = {
    // Returns true if login was successful
    login(): Promise<boolean>;

    // Returns true if create account was successful
    createAccount(): Promise<boolean>;

    // Returns true if forgot password was successful
    forgotPassword(): Promise<boolean>;
};

@Injectable({
    providedIn: 'root',
})
export class PxbAuthApiService implements IPxbAuthApiService {
    warn(): void {
        /* eslint-disable no-console */
        console.warn('You need to provide your own PxbAuthService');
    }

    login(): Promise<boolean> {
        this.warn();
        return undefined;
    }

    createAccount(): Promise<boolean> {
        this.warn();
        return undefined;
    }

    forgotPassword(): Promise<boolean> {
        this.warn();
        return undefined;
    }
}
