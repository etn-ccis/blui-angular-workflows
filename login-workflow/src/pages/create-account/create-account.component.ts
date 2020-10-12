import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthErrorStateMatcher } from '../../util/matcher';
import { PXB_LOGIN_VALIDATOR_ERROR_NAME } from '../public-api';
import { PXB_AUTH_CONFIG, PxbAuthConfig } from '../../config/auth-config';
import { LOGIN_ROUTE } from '../../config/route-names';
import { SAMPLE_EULA } from '../../constants/sampleEula';
import { ErrorStateMatcher } from '@angular/material';

// class CrossFieldErrorMatcher implements ErrorStateMatcher {
//     isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
//         return control.dirty && form.invalid;
//     }
// }

@Component({
    selector: 'pxb-create-account',
    templateUrl: './create-account.component.html',
    styleUrls: ['./create-account.component.scss'],
})
export class PxbCreateAccountComponent implements OnInit {
    @Input() customEmailValidator: ValidatorFn;
    @Input() licenseAgreement: string = SAMPLE_EULA;
    currentPageId: number;
    customErrorName = PXB_LOGIN_VALIDATOR_ERROR_NAME;
    emailFormControl: FormControl;
    verificationCodeFormControl: FormControl;
    emailMatcher = new AuthErrorStateMatcher();
    newPasswordFormControl: FormControl;
    confirmPasswordFormControl: FormControl;
    newPasswordVisible = false;
    confirmPasswordVisible = false;
    // errorMatcher = new CrossFieldErrorMatcher();
    passLength = false;
    specialFlag = false;
    numberFlag = false;
    upperFlag = false;
    lowerFlag = false;

    constructor(
        private readonly _router: Router,
        @Inject(PXB_AUTH_CONFIG) private readonly _config: PxbAuthConfig
    ) { }

    ngOnInit(): void {
        this.currentPageId = 0;

        const emailValidators = [Validators.required, Validators.email];
        if (this.customEmailValidator) {
            emailValidators.push(this.customEmailValidator);
        }
        this.emailFormControl = new FormControl('', emailValidators);
        this.verificationCodeFormControl = new FormControl('', Validators.required);
        this.newPasswordFormControl = new FormControl('');
        this.confirmPasswordFormControl = new FormControl('');
    }

    getTitle() {
        switch (this.currentPageId) {
            case 0:
                return 'Create an Account';
            case 1:
                return 'License Agreement';
            case 2:
                return 'Verify Email';
            case 3:
                return 'Create Password';
            case 4:
                return 'Account Details';
            case 5:
                return 'Account Created';
        }
    }

    sendVerificationEmail() {
        // send verification email
    }

    toggleNewPasswordVisibility() {
        this.newPasswordVisible = !this.newPasswordVisible;
    }

    toggleConfirmPasswordVisibility() {
        this.confirmPasswordVisible = !this.confirmPasswordVisible;
    }

    checkPasswordStrength(password: string): void {
        this.passLength = password.length > 7;
        this.specialFlag = /[!@#$^&]/.test(password);
        this.numberFlag = /[0-9]/.test(password);
        this.upperFlag = /[A-Z]/.test(password);
        this.lowerFlag = /[a-z]/.test(password);
    }

    // checkPasswords(): any {
    //     const password = this.newPasswordFormControl.value;
    //     const confirmPassword = this.confirmPasswordFormControl.value;
    //     return password === confirmPassword ? null : { passwordsDoNotMatch: true };
    // }

    goBack() {
        if(this.currentPageId === 0) {
            this.navigateToLogin();
        } else {
            this.currentPageId = this.currentPageId - 1;
        }
    }

    next() {
        this.currentPageId = this.currentPageId + 1;
    }

    navigateToLogin() {
        void this._router.navigate([`${this._config.authRoute}/${LOGIN_ROUTE}`]);
    }
}
