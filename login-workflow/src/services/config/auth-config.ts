import { Injectable } from '@angular/core';

export type PasswordRequirement = {
    description: string;
    regex: RegExp;
};
@Injectable({
    providedIn: 'root',
})
export class PxbAuthConfig implements PxbAuthConfig {
    homeRoute = 'home'; // TODO: Rename this to 'onAuthenticatedRoute'
    authRoute = 'auth';
    contactEmail = 'something@email.com';
    contactPhone = '1-800-123-4567';
    // @TODO: using this for splash screen... should we use this in place of ng-content for header in the login component? Should we have an additional prop for footerImage
    projectImage: string;
    backgroundImage: string;

    passwordRequirements?: PasswordRequirement[]; //TODO: Add default here.

    eula: string;
    htmlEula = false;
    allowDebugMode = false;
    showSelfRegistration = true;
}
