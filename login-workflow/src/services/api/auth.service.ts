import { Injectable } from '@angular/core';

export type IPxbAuthApiService = {};

@Injectable({
    providedIn: 'root',
})
export class PxbAuthApiService implements IPxbAuthApiService {
    warn(): void {
        /* eslint-disable no-console */
        console.warn('You need to provide your own PxbAuthService');
    }
}
