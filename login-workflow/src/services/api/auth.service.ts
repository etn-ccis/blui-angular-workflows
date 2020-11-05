import { Injectable } from '@angular/core';

export type IPxbAuthApiService = {
    // Returns true if initiateSecurity was successful
    initiateSecurity(): Promise<boolean>;
};

@Injectable({
    providedIn: 'root',
})
export class PxbAuthApiService implements IPxbAuthApiService {
    warn(): void {
        /* eslint-disable no-console */
        console.warn('You need to provide your own PxbAuthService');
    }

    initiateSecurity(): Promise<boolean> {
        this.warn();
        return undefined;
    }
}
