import { Component } from '@angular/core';
import {AbstractControl, ValidatorFn} from "@angular/forms";
import { PXB_LOGIN_VALIDATOR_ERROR_NAME } from '@pxblue/angular-auth-workflow';

@Component({
    selector: 'app-auth',
    template: `
        <pxb-auth backgroundImage="assets/images/background.svg">
            <pxb-login [customEmailValidator]="customValidator()" enableDebugMode="true">
              <div pxb-login-header><img src="assets/images/eaton_stacked_logo.png" style="max-width: 100%; max-height: 80px;"/></div>
              <div pxb-login-footer style="text-align: center;"><img src="assets/images/cybersecurity_certified.png" style="max-width: 30%; align-self: center;"/></div>
            </pxb-login>
            <pxb-contact-support contactEmail="testEmail@email.com" contactPhone="555-555-5555">  
            </pxb-contact-support>
            <pxb-forgot-password contactPhone="555-555-5555">
            </pxb-forgot-password>
            <pxb-reset-password></pxb-reset-password>
            <pxb-create-account></pxb-create-account>
            <pxb-create-account-invite></pxb-create-account-invite>
        </pxb-auth>
    `,
})
export class AuthComponent {
    constructor() {}

  customValidator(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      const forbidden = (/test/i).test(control.value);
      return forbidden ? { PXB_LOGIN_VALIDATOR_ERROR_NAME: { message: 'This is a custom error, provided by end user'}} : null;
    };
  }
}
