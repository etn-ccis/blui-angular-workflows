import { Injectable } from '@angular/core';

// eslint-disable-next-line @typescript-eslint/ban-types
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
