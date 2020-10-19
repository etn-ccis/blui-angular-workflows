import { Component, Inject, Input, OnInit } from '@angular/core';
import { ValidatorFn, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthErrorStateMatcher } from '../../util/matcher';
import { PXB_AUTH_CONFIG, PxbAuthConfig } from '../../config/auth-config';
import { LOGIN_ROUTE } from '../../config/route-names';
import { PXB_LOGIN_VALIDATOR_ERROR_NAME } from '../login/login.component';

@Component({
    selector: 'pxb-forgot-password',
    templateUrl: './forgot-password.component.html',
    styleUrls: ['./forgot-password.component.scss'],
})
export class PxbForgotPasswordComponent implements OnInit {
    @Input() contactPhone = '1-800-123-4567';
    @Input() successTitle = 'Email Sent';
    @Input() successDescription = 'A link to reset your password has been sent to ';
    @Input() includeEmailInSuccessMessage = true;
    customErrorName = PXB_LOGIN_VALIDATOR_ERROR_NAME;
    @Input() customEmailValidator: ValidatorFn;

    emailFormControl: FormControl;
    matcher = new AuthErrorStateMatcher();
    passwordResetSuccess = false;
    successDescriptionMessage: string;

    constructor(private readonly _router: Router, @Inject(PXB_AUTH_CONFIG) private readonly _config: PxbAuthConfig) {}

    ngOnInit(): void {
        const emailValidators = [
            Validators.required,
            Validators.email,
            Validators.pattern(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i),
        ];
        if (this.customEmailValidator) {
            emailValidators.push(this.customEmailValidator);
        }
        this.emailFormControl = new FormControl('', emailValidators);
    }

    done(): void {
        this.navigateToLogin();
        this.passwordResetSuccess = false;
        this.emailFormControl.reset();
        this.successDescriptionMessage = null;
    }

    navigateToLogin(): void {
        void this._router.navigate([`${this._config.authRoute}/${LOGIN_ROUTE}`]);
    }

    resetPassword(): void {
        // submit form

        if (this.includeEmailInSuccessMessage) {
            this.successDescriptionMessage = `${this.successDescription} ${this.emailFormControl.value}.`;
        } else {
            this.successDescriptionMessage = this.successDescription;
        }

        this.passwordResetSuccess = true;
    }
}
