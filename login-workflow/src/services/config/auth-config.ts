import { Injectable } from '@angular/core';
import { ValidatorFn } from '@angular/forms';
import { AuthTranslationLanguageCode, PxbAuthTranslations } from '../../translations/auth-translations';
import { pxbAuthEnglishTranslations } from '../../translations/english';
import { pxbAuthFrenchTranslations } from '../../translations/french';
import { pxbAuthSpanishTranslations } from '../../translations/spanish';
import { pxbAuthChineseTranslations } from '../../translations/chinese';

export const PXB_LOGIN_VALIDATOR_ERROR_NAME = 'PXB_LOGIN_VALIDATOR_ERROR_NAME';

export type PasswordRequirement = {
    description: string;
    regex: RegExp;
};

export type NameRequirement = {
    description: string;
    regex: RegExp;
}
@Injectable({
    providedIn: 'root',
})
export class PxbAuthConfig {
    authGuardRedirectRoute = undefined;

    languageCode: AuthTranslationLanguageCode = 'EN';
    customTranslations: PxbAuthTranslations;
    allowDebugMode = false;
    showRememberMe = true;

    projectImage: string;
    backgroundImage: string;

    contactEmail = 'placeholder-support@eaton.com';
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

    /** Array of custom first name requirements used in the account registration pages. */
    customFirstNameRequirements: NameRequirement[] = [];
    /** Array of custom last name requirements used in the account registration pages. */
    customLastNameRequirements: NameRequirement[] = [];
    customEmailValidator: ValidatorFn;

    getTranslations(): PxbAuthTranslations {
        if (this.customTranslations) {
            return this.customTranslations;
        }
        switch (this.languageCode) {
            case 'EN': {
                return pxbAuthEnglishTranslations;
            }
            case 'FR': {
                return pxbAuthFrenchTranslations;
            }
            case 'ES': {
                return pxbAuthSpanishTranslations;
            }
            case 'ZH': {
                return pxbAuthChineseTranslations;
            }
            default: {
                return pxbAuthEnglishTranslations;
            }
        }
    }

    getFirstNameRequirements(): NameRequirement[] {
        return this.customFirstNameRequirements;
    }

    getLastNameRequirements(): NameRequirement[] {
        return this.customLastNameRequirements;
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
