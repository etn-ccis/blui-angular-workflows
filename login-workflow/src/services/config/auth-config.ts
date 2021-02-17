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

    passwordRequirements?: PasswordRequirement[] = [
        {
            description: this.getTranslations().PASSWORD_CRITERIA.CHARACTER_LIMIT,
            regex: /^.{8,16}$/,
        },
        {
            description: this.getTranslations().PASSWORD_CRITERIA.ONE_NUMBER,
            regex: /[0-9]/,
        },
        {
            description: this.getTranslations().PASSWORD_CRITERIA.ONE_UPPERCASE_CHARACTER,
            regex: /[A-Z]/,
        },
        {
            description: this.getTranslations().PASSWORD_CRITERIA.ONE_LOWERCASE_CHARACTER,
            regex: /[a-z]/,
        },
        {
            description: this.getTranslations().PASSWORD_CRITERIA.ONE_SPECIAL_CHARACTER,
            regex: /[!"#$%&'()*+,-./:;<=>?@[\]^`{|}~]+/,
        },
    ];
}
