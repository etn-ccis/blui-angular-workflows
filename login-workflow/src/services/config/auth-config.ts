import { Injectable } from '@angular/core';
import { ValidatorFn } from '@angular/forms';
import { AuthTranslationLanguageCode, BluiAuthTranslations } from '../../translations/auth-translations';
import { bluiAuthEnglishTranslations } from '../../translations/english';
import { bluiAuthFrenchTranslations } from '../../translations/french';
import { bluiAuthSpanishTranslations } from '../../translations/spanish';
import { bluiAuthChineseTranslations } from '../../translations/chinese';

export const BLUI_LOGIN_VALIDATOR_ERROR_NAME = 'BLUI_LOGIN_VALIDATOR_ERROR_NAME';

export type PasswordRequirement = {
    description: string;
    regex: RegExp;
};

@Injectable({
    providedIn: 'root',
})
export class BluiAuthConfig {
    authGuardRedirectRoute = undefined;

    languageCode: AuthTranslationLanguageCode = 'EN';
    customTranslations: BluiAuthTranslations;
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

    /** Custom first name requirements used in the account registration pages. */
    customFirstNameRequirements: { maxLength: number } = undefined;

    /** Custom last name requirements used in the account registration pages. */
    customLastNameRequirements: { maxLength: number } = undefined;
    customEmailValidator: ValidatorFn;

    getTranslations(): BluiAuthTranslations {
        if (this.customTranslations) {
            return this.customTranslations;
        }
        switch (this.languageCode) {
            case 'EN': {
                return bluiAuthEnglishTranslations;
            }
            case 'FR': {
                return bluiAuthFrenchTranslations;
            }
            case 'ES': {
                return bluiAuthSpanishTranslations;
            }
            case 'ZH': {
                return bluiAuthChineseTranslations;
            }
            default: {
                return bluiAuthEnglishTranslations;
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
