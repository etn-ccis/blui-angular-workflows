/* eslint-disable no-console */
import { Injectable } from '@angular/core';
import { IPxbRegisterUIService, PxbAuthSecurityService, PxbAuthConfig } from '@pxblue/angular-auth-workflow';
import { SAMPLE_EULA } from '../constants/sampleEula';
import { FormControl } from '@angular/forms';

export const randomFailure = () => Math.random() < 0.25;
const TIMEOUT_MS = 1500;
@Injectable({
    providedIn: 'root',
})
export class RegisterUIService implements IPxbRegisterUIService {
    constructor(
        private readonly _pxbSecurityService: PxbAuthSecurityService,
        private readonly _pxbAuthConfig: PxbAuthConfig
    ) {}

    validateUserRegistrationRequest(code?: string): Promise<void> {
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
                return resolve();
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
                    this._pxbAuthConfig.eula = eula; // This prevents future EULA load requests.
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
        formControls: FormControl[],
        password: string,
        validationCode?: string,
        email?: string
    ): Promise<void> {
        const urlParams = new URLSearchParams(window.location.search);
        const urlCode = urlParams.get('code');
        if (!validationCode) {
            validationCode = urlCode;
        }
        const firstName = formControls[0]?.value;
        const lastName = formControls[1]?.value;
        const country = formControls[2]?.value;
        const phoneNumber = formControls[3]?.value;
        console.log(
            `Performing a sample CompleteRegistration request with the following credentials:\n firstName: ${firstName}\n lastName: ${lastName}\n country: ${country}\n phoneNumber: ${phoneNumber}\n password: ${password}\n validationCode: ${validationCode}\n email: ${email}`
        );
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (firstName && firstName.toUpperCase() === 'FAIL') {
                    return reject();
                }
                this._pxbSecurityService.updateSecurityState({ email: 'sample-email@test.com' });
                return resolve();
            }, TIMEOUT_MS);
        });
    }
}
