import { Injectable } from '@angular/core';

export type PasswordRequirement = {
    description: string;
    regex: RegExp;
};
@Injectable({
    providedIn: 'root',
})
export class PxbAuthConfig implements PxbAuthConfig {
    contactEmail = 'something@email.com';
    contactPhone = '1-800-123-4567';
    // @TODO: using this for splash screen... should we use this in place of ng-content for header in the login component? Should we have an additional prop for footerImage
    projectImage: string;
    backgroundImage: string;
    eulaScrollLock = true;

    passwordRequirements?: PasswordRequirement[] = [
        {
            description: '8-16 Characters',
            regex: /^.{8,16}$/,
        },
        {
            description: 'One number',
            regex: /[0-9]/,
        },
        {
            description: 'One uppercase letter',
            regex: /[A-Z]/,
        },
        {
            description: 'One lowercase letter',
            regex: /[a-z]/,
        },
        {
            description: 'One special character',
            regex: /[!"#$%&'()*+,-./:;<=>?@[\]^`{|}~]+/,
        },
    ];
    eula: string;
    allowDebugMode = false;
    showSelfRegistration = true;
    showContactSupport = true;
    showForgotPassword = true;
    showRememberMe = true;
}
