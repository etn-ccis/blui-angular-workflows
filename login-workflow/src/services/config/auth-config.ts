import { Injectable } from '@angular/core';
import { PxbAuthTranslations } from '../../translations/auth-translations';
import { pxbAuthEnglishTranslations } from '../../translations/english';
import { pxbAuthFrenchTranslations } from '../../translations/french';

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
    projectImage: string;
    backgroundImage: string;
    languageCode = 'EN';

    eula: string;
    eulaScrollLock = true;
    allowDebugMode = false;
    showRememberMe = true;

    passwordRequirements?: PasswordRequirement[] = [
        {
            description: 'asdlkgj', //TODO: Handle alnguage changes here.
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

    /* Conditional Pages */
    showCreateAccount = true;
    showContactSupport = true;
    showForgotPassword = true;
    showResetPassword = true;
    showCreateAccountViaInvite = true;

    getTranslations(): PxbAuthTranslations {
        switch (this.languageCode) {
            case 'EN': {
                return pxbAuthEnglishTranslations;
            }
            case 'FR': {
                return pxbAuthFrenchTranslations;
            }
            default: {
                return pxbAuthEnglishTranslations;
            }
        }
    }
}
