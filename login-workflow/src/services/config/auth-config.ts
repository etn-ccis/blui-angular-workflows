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
    languageCode = 'EN';
    allowDebugMode = false;
    showRememberMe = true;

    projectImage: string;
    backgroundImage: string;

    contactEmail = 'something@email.com';
    contactPhone = '1-800-123-4567';

    eula: string;
    eulaScrollLock = true;

    /* Conditional Pages */
    showCreateAccount = true;
    showContactSupport = true;
    showForgotPassword = true;
    showResetPassword = true;
    showCreateAccountViaInvite = true;

    /* Password requirements */
    defaultPasswordRequirements = {
        characterLimit: true,
        uppercaseLetter: true,
        lowercaseLetter: true,
        requireNumber: true,
        specialCharacter: true,
    };
    customPasswordRequirements: PasswordRequirement[] = [];

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

    getPasswordRequirements(): PasswordRequirement[] {
        const req: PasswordRequirement[] = [];
        if (this.defaultPasswordRequirements.characterLimit) {
            req.push({
                description: this.getTranslations().PASSWORD_CRITERIA.CHARACTER_LIMIT,
                regex: /^.{8,16}$/,
            });
        }
        if (this.defaultPasswordRequirements.requireNumber) {
            req.push({
                description: this.getTranslations().PASSWORD_CRITERIA.ONE_NUMBER,
                regex: /[0-9]/,
            });
        }
        if (this.defaultPasswordRequirements.uppercaseLetter) {
            req.push({
                description: this.getTranslations().PASSWORD_CRITERIA.ONE_UPPERCASE_CHARACTER,
                regex: /[A-Z]/,
            });
        }
        if (this.defaultPasswordRequirements.lowercaseLetter) {
            req.push({
                description: this.getTranslations().PASSWORD_CRITERIA.ONE_LOWERCASE_CHARACTER,
                regex: /[a-z]/,
            });
        }
        if (this.defaultPasswordRequirements.specialCharacter) {
            req.push({
                description: this.getTranslations().PASSWORD_CRITERIA.ONE_SPECIAL_CHARACTER,
                regex: /[!"#$%&'()*+,-./:;<=>?@[\]^`{|}~]+/,
            });
        }
        return req.concat(this.customPasswordRequirements);
    }
}
