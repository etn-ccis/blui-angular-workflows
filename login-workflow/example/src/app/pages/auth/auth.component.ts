import { Component } from '@angular/core';
import {AbstractControl, ValidatorFn} from "@angular/forms";
import { PXB_LOGIN_VALIDATOR_ERROR_NAME } from '@pxblue/angular-auth-workflow';

@Component({
    selector: 'app-auth',
    template: `
        <pxb-auth>
            <pxb-login [customEmailValidator]="customValidator()">
              <div pxb-login-header>Custom Login Page Header</div>
              <div pxb-login-footer>Custom Login Page Footer</div>
            </pxb-login>
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
