/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';

/* Registration Actions to be performed when a user attempts to register */
export type IPxbRegisterUIService = {
    // The user has tapped on an email link inviting them to register with the application. The application should validate the code provided by the link.
    validateUserRegistrationRequest(code?: string): Promise<void>;

    // The user wants to complete an action but must first accept the EULA. The application should retrieve an application-specific EULA for the user.
    loadEULA(): Promise<string>;

    // The user entered their email address and accepted the EULA. The API should now send them an email with the validation code.
    requestRegistrationCode(email: string): Promise<void>;

    // The user has been invited to register and has entered the necessary account and password information. The application should now complete the registration process given the user's data
    completeRegistration(
        firstName: string,
        lastName: string,
        customAccountDetails: Map<string, FormControl>,
        password: string,
        validationCode?: string,
        email?: string
    ): Promise<void>;
};

@Injectable({
    providedIn: 'root',
})
export class PxbRegisterUIService implements IPxbRegisterUIService {
    warn(): void {
        /* eslint-disable no-console */
        console.warn('You need to provide your own PxbRegisterUIService');
    }

    validateUserRegistrationRequest(code?: string): Promise<void> {
        this.warn();
        return undefined;
    }

    loadEULA(): Promise<string> {
        this.warn();
        return undefined;
    }

    requestRegistrationCode(email: string): Promise<void> {
        this.warn();
        return undefined;
    }

    completeRegistration(
        firstName: string,
        lastName: string,
        customAccountDetails: Map<string, FormControl>,
        password: string,
        validationCode?: string,
        email?: string
    ): Promise<void> {
        this.warn();
        return undefined;
    }
}
