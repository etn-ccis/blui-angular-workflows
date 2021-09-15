import { pxbAuthSpanishTranslations } from './spanish';
import { pxbAuthChineseTranslations } from './chinese';
import { pxbAuthFrenchTranslations } from './french';
import { pxbAuthEnglishTranslations } from './english';

describe('Translations', () => {
    it('should test all translation functions', () => {
        const translationsArr = [
            pxbAuthSpanishTranslations,
            pxbAuthChineseTranslations,
            pxbAuthFrenchTranslations,
            pxbAuthEnglishTranslations,
        ];

        for (const translation of translationsArr) {
            void expect(translation.GENERAL.IS_REQUIRED_ERROR('field')).toBeTruthy();
            void expect(translation.CREATE_ACCOUNT.ACCOUNT_EXISTING.WELCOME_MESSAGE_DESCRIPTION('email')).toBeTruthy();
            void expect(translation.CREATE_ACCOUNT.ACCOUNT_CREATED.WELCOME_MESSAGE_DESCRIPTION('email')).toBeTruthy();
            void expect(translation.CREATE_ACCOUNT.ACCOUNT_CREATED.WELCOME_MESSAGE_TITLE('username')).toBeTruthy();
            void expect(translation.CREATE_ACCOUNT.ACCOUNT_CREATED.WELCOME_MESSAGE_DESCRIPTION('email')).toBeTruthy();
            void expect(translation.FORGOT_PASSWORD.CONTACT_SUPPORT_BY_PHONE('phone')).toBeTruthy();
            void expect(translation.FORGOT_PASSWORD.SUCCESS_DESCRIPTION('email')).toBeTruthy();
            void expect(translation.CONTACT_SUPPORT.EMERGENCY_SUPPORT_DESCRIPTION('phone')).toBeTruthy();
            void expect(translation.CONTACT_SUPPORT.GENERAL_SUPPORT_DESCRIPTION('email')).toBeTruthy();
        }
    });
});
