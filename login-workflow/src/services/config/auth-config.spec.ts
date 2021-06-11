import { TestBed } from '@angular/core/testing';
import { PxbAuthConfig } from './auth-config';
import { pxbAuthFrenchTranslations } from '../../translations/french';
import { pxbAuthEnglishTranslations } from '../../translations/english';
import { pxbAuthChineseTranslations } from '../../translations/chinese';
import { pxbAuthSpanishTranslations } from '../../translations/spanish';

describe('PxbAuthConfig', () => {
    let authConfig: PxbAuthConfig;
    beforeEach(() => {
        void TestBed.configureTestingModule({}).compileComponents();
        authConfig = TestBed.inject(PxbAuthConfig);
    });

    it('should return french translations when FR language code is used', () => {
        authConfig.languageCode = 'FR';
        expect(authConfig.getTranslations()).toBe(pxbAuthFrenchTranslations);
    });

    it('should return english translations when EN language code is used', () => {
        authConfig.languageCode = 'EN';
        expect(authConfig.getTranslations()).toBe(pxbAuthEnglishTranslations);
    });

    it('should return chinese translations when ZH language code is used', () => {
        authConfig.languageCode = 'ZH';
        expect(authConfig.getTranslations()).toBe(pxbAuthChineseTranslations);
    });

    it('should return spanish translations when ES language code is used', () => {
        authConfig.languageCode = 'ES';
        expect(authConfig.getTranslations()).toBe(pxbAuthSpanishTranslations);
    });
});
