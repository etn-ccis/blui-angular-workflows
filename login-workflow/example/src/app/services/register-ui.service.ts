/* eslint-disable no-console */
import { Injectable } from '@angular/core';
import { IBluiRegisterUIService, BluiAuthSecurityService, BluiAuthConfig } from '@brightlayer-ui/angular-auth-workflow';
import { SAMPLE_EULA } from '../constants/sampleEula';
import { FormControl } from '@angular/forms';

export const randomFailure = () => Math.random() < 0.25;
const TIMEOUT_MS = 1500;
@Injectable({
    providedIn: 'root',
})
export class RegisterUIService implements IBluiRegisterUIService {
    constructor(
        private readonly _bluiSecurityService: BluiAuthSecurityService,
        private readonly _bluiAuthConfig: BluiAuthConfig
    ) {}

    validateUserRegistrationRequest(code?: string): Promise<boolean> {
        const urlParams = new URLSearchParams(window.location.search);
        const registrationCode = code || urlParams.get('code');
        console.log(
            `Performing a sample ValidateUserRegistration request with the following credentials:\n code: ${registrationCode}`
        );
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (
                    !registrationCode ||
                    registrationCode.toUpperCase() === 'INVALID_LINK' ||
                    registrationCode.toUpperCase() === 'FAIL'
                ) {
                    return reject();
                }
                if (registrationCode.toUpperCase() === 'BRIGHTLAYER_CLOUD') {
                    return resolve(true);
                }
                return resolve(false);
            }, TIMEOUT_MS);
        });
    }

    loadEULA(): Promise<string> {
        const urlParams = new URLSearchParams(window.location.search);
        const registrationCode = urlParams.get('code');
        console.log(`Performing a sample loadEULA request.`);
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (registrationCode && registrationCode.toUpperCase() === 'EULA_FAIL') {
                    return reject();
                }
                if (randomFailure()) {
                    return reject();
                } else {
                    const eula = SAMPLE_EULA;
                    this._bluiAuthConfig.eula = eula; // This prevents future EULA load requests.
                    return resolve(eula);
                }
            }, TIMEOUT_MS);
        });
    }

    requestRegistrationCode(email: string): Promise<void> {
        console.log(
            `Performing a sample RequestRegistrationCode request with the following credentials:\n email: ${email}`
        );
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (email.toUpperCase() === 'FAIL@TEST.COM') {
                    return reject();
                }
                return resolve();
            }, TIMEOUT_MS);
        });
    }

    completeRegistration(
        firstName: string,
        lastName: string,
        customAccountDetails: Map<string, FormControl>,
        password: string,
        validationCode?: string,
        email?: string
    ): Promise<void> {
        const urlParams = new URLSearchParams(window.location.search);
        const urlCode = urlParams.get('code');
        if (!validationCode) {
            validationCode = urlCode;
        }
        console.log(
            `Performing a sample CompleteRegistration request with the following credentials:\n firstName: ${firstName}\n lastName: ${lastName}\n password: ${password}\n validationCode: ${validationCode}\n email: ${email}`
        );
        console.log(`Custom account details:`);
        for (const key of customAccountDetails.keys()) {
            console.log(`${key}: ${customAccountDetails.get(key).value}`);
        }
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (firstName && firstName.toUpperCase() === 'FAIL') {
                    return reject();
                }
                this._bluiSecurityService.updateSecurityState({ email: 'sample-email@test.com' });
                return resolve();
            }, TIMEOUT_MS);
        });
    }
}
