import { Injectable } from '@angular/core';

/* Authentication Actions to be performed based on the user's UI actions. */
export type IPxbAuthUIActionsService = {
    // Returns true if initiateSecurity was successful
    initiateSecurity(): Promise<boolean>;  // TODO: Should this even be in this service?  This does not seem like something a user should be provindg.

    // The user wants to log into the application
    login(email: string, password: string, rememberMe: boolean): Promise<void>;
};

@Injectable({
    providedIn: 'root',
})
export class PxbAuthUIActionsService implements IPxbAuthUIActionsService {
    warn(): void {
        /* eslint-disable no-console */
        console.warn('You need to provide your own PxbAuthUIActionsService');
    }

    login(email: string, password: string, rememberMe: boolean): Promise<void> {
      this.warn();
      return undefined;
    }

    initiateSecurity(): Promise<boolean> {
        this.warn();
        return undefined;
    }
}
