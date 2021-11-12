import { TestBed } from '@angular/core/testing';
import { BluiAuthConfig } from './auth-config';
import { bluiAuthFrenchTranslations } from '../../translations/french';
import { bluiAuthEnglishTranslations } from '../../translations/english';
import { bluiAuthChineseTranslations } from '../../translations/chinese';
import { bluiAuthSpanishTranslations } from '../../translations/spanish';

describe('BluiAuthConfig', () => {
    let authConfig: BluiAuthConfig;
    beforeEach(() => {
        void TestBed.configureTestingModule({}).compileComponents();
        authConfig = TestBed.inject(BluiAuthConfig);
    });

    it('should return french translations when FR language code is used', () => {
        authConfig.languageCode = 'FR';
        void expect(authConfig.getTranslations()).toBe(bluiAuthFrenchTranslations);
    });

    it('should return english translations when EN language code is used', () => {
        authConfig.languageCode = 'EN';
        void expect(authConfig.getTranslations()).toBe(bluiAuthEnglishTranslations);
    });

    it('should return chinese translations when ZH language code is used', () => {
        authConfig.languageCode = 'ZH';
        void expect(authConfig.getTranslations()).toBe(bluiAuthChineseTranslations);
    });

    it('should return spanish translations when ES language code is used', () => {
        authConfig.languageCode = 'ES';
        void expect(authConfig.getTranslations()).toBe(bluiAuthSpanishTranslations);
    });
});
