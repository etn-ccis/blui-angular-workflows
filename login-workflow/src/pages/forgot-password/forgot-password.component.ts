import { Component, Inject, Input, OnInit } from '@angular/core';
import { ValidatorFn, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthErrorStateMatcher } from '../../util/matcher';
import { PXB_AUTH_CONFIG, PxbAuthConfig } from '../../config/auth-config';
import { LOGIN_ROUTE } from '../../config/route-names';
import { PXB_LOGIN_VALIDATOR_ERROR_NAME } from '../public-api';

@Component({
    selector: 'pxb-forgot-password',
    templateUrl: './forgot-password.component.html',
    styleUrls: ['./forgot-password.component.scss'],
})
export class PxbForgotPasswordComponent implements OnInit {
    @Input() contactPhone: string = '1-800-123-4567';

    customErrorName = PXB_LOGIN_VALIDATOR_ERROR_NAME;
    @Input() customEmailValidator: ValidatorFn;

    emailFormControl: FormControl;
    matcher = new AuthErrorStateMatcher();
    
    constructor(
        private readonly _router: Router,
        @Inject(PXB_AUTH_CONFIG) private readonly _config: PxbAuthConfig
    ) {}

    ngOnInit(): void {
        const emailValidators = [Validators.required, Validators.email ];
      if (this.customEmailValidator) {
        emailValidators.push(this.customEmailValidator);
      }
      this.emailFormControl = new FormControl('', emailValidators);
    }

    navigateToLogin() {
        void this._router.navigate([`${this._config.authRoute}/${LOGIN_ROUTE}`]);
    }

    submit() {
        // submit form
        // change screen to confirmation screen
    }
}
