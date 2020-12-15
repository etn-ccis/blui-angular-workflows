import { Component } from '@angular/core';
import { AbstractControl, ValidatorFn } from '@angular/forms';
import { PxbAuthConfig, AUTH_ROUTES } from '@pxblue/angular-auth-workflow';

@Component({
    selector: 'app-auth',
    template: `
        <pxb-auth [loginRef]="loginPage">
            <ng-template #loginPage>
                <pxb-login [customEmailValidator]="customValidator()">
                    <div pxb-login-header>
                        <img src="assets/images/eaton_stacked_logo.png" style="max-width: 100%; max-height: 80px;" />
                    </div>
                    <div pxb-login-footer style="text-align: center;">
                        <img
                            src="assets/images/cybersecurity_certified.png"
                            style="max-width: 30%; align-self: center;"
                        />
                    </div>
                </pxb-login>
            </ng-template>
        </pxb-auth>
    `,
})
export class AuthComponent {
    constructor(pxbAuthConfig: PxbAuthConfig) {
        pxbAuthConfig.projectImage = 'assets/images/eaton_stacked_logo.png';
        pxbAuthConfig.backgroundImage = 'assets/images/background.svg';
        pxbAuthConfig.allowDebugMode = true;
        pxbAuthConfig.showSelfRegistration = false;
        pxbAuthConfig.passwordRequirements.push({
            regex: /^((?!password).)*$/,
            description: 'Does not contain "password"',
        });
        // If the ON_AUTHENTICATED route is not pre-populated by PXB auth workflow, provide it below.
        if (!AUTH_ROUTES.ON_AUTHENTICATED || AUTH_ROUTES.ON_AUTHENTICATED === '/') {
            AUTH_ROUTES.ON_AUTHENTICATED = 'home';
        }
    }

    customValidator(): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } | null => {
            const forbidden = /test/i.test(control.value);
            return forbidden
                ? { PXB_LOGIN_VALIDATOR_ERROR_NAME: { message: 'This is a custom error, provided by end user' } }
                : null;
        };
    }
}
