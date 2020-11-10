import { Injectable } from '@angular/core';

// @TODO: remove this once IPxbRegistrationApiService is defined.
// eslint-disable-next-line @typescript-eslint/ban-types
export type IPxbRegistrationApiService = {};

@Injectable({
    providedIn: 'root',
})
export class PxbRegistrationApiService implements IPxbRegistrationApiService {
    warn(): void {
        /* eslint-disable no-console */
        console.warn('You need to provide your own PxbRegistrationService');
    }
}
