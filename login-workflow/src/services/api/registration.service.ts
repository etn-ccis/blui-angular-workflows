import { Injectable } from '@angular/core';

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
