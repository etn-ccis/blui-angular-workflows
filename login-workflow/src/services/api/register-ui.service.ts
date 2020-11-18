import { Injectable } from '@angular/core';

/* Registration Actions to be performed when a user attempts to register */
export type IPxbRegisterUIService = {
    // The user has tapped on an email link inviting them to register with the application. The application should validate the code provided by the link.
    validateUserRegistrationRequest(): Promise<void>;

    // The user wants to complete an action but must first accept the EULA. The application should retrieve an application-specific EULA for the user.
    loadEULA(): Promise<string>;

    // The user has been invited to register and has entered the necessary account and password information. The application should now complete the registration process given the user's data
    completeRegistration(): Promise<void>;
};

@Injectable({
    providedIn: 'root',
})
export class PxbRegisterUIService implements IPxbRegisterUIService {
    warn(): void {
        /* eslint-disable no-console */
        console.warn('You need to provide your own PxbRegistrationService');
    }

    validateUserRegistrationRequest(): Promise<void> {
        this.warn();
        return undefined;
    }

    loadEULA(): Promise<string> {
        this.warn();
        return undefined;
    }

    completeRegistration(): Promise<void> {
        this.warn();
        return undefined;
    }
}
