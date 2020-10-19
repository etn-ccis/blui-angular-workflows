import { Component, Inject, Input, OnInit } from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    FormGroupDirective,
    NgForm,
    ValidatorFn,
    Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthErrorStateMatcher } from '../../util/matcher';
import { PXB_AUTH_CONFIG, PxbAuthConfig } from '../../config/auth-config';
import { LOGIN_ROUTE } from '../../config/route-names';
import { SAMPLE_EULA } from '../../constants/sampleEula';
import { ErrorStateMatcher } from '@angular/material/core';
import { PXB_LOGIN_VALIDATOR_ERROR_NAME } from '../login/login.component';

class CrossFieldErrorMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        return control.dirty && form.invalid;
    }
}

@Component({
    selector: 'pxb-create-account',
    templateUrl: './create-account.component.html',
    styleUrls: ['./create-account.component.scss'],
})
export class PxbCreateAccountComponent implements OnInit {
    @Input() customEmailValidator: ValidatorFn;
    @Input() licenseAgreement: string = SAMPLE_EULA;
    pageCount = 6;
    currentPageId: number;
    customErrorName = PXB_LOGIN_VALIDATOR_ERROR_NAME;
    emailFormControl: FormControl;
    confirmAgreement = false;
    verificationCodeFormControl: FormControl;
    emailMatcher = new AuthErrorStateMatcher();
    passwordFormGroup: FormGroup;
    firstNameFormControl: FormControl;
    lastNameFormControl: FormControl;
    phoneNumberFormControl: FormControl;
    newPasswordVisible = false;
    confirmPasswordVisible = false;
    errorMatcher = new CrossFieldErrorMatcher();
    passLength = false;
    specialFlag = false;
    numberFlag = false;
    upperFlag = false;
    lowerFlag = false;

    constructor(
        private readonly _router: Router,
        @Inject(PXB_AUTH_CONFIG) private readonly _config: PxbAuthConfig,
        private readonly _formBuilder: FormBuilder
    ) {
        this.passwordFormGroup = this._formBuilder.group(
            {
                newPassword: ['', Validators.compose([Validators.required, Validators.minLength(8)])],
                confirmPassword: ['', Validators.required],
            },
            {
                validator: this.checkPasswords,
            }
        );
    }

    ngOnInit(): void {
        this.currentPageId = 0;

        const emailValidators = [
            Validators.required,
            Validators.email,
            Validators.pattern(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i),
        ];
        if (this.customEmailValidator) {
            emailValidators.push(this.customEmailValidator);
        }
        this.emailFormControl = new FormControl('', emailValidators);
        this.verificationCodeFormControl = new FormControl('', Validators.required);
        this.firstNameFormControl = new FormControl('', Validators.required);
        this.lastNameFormControl = new FormControl('', Validators.required);
        this.phoneNumberFormControl = new FormControl('');
    }

    getTitle(): string {
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
                return 'Account Created!';
            default:
                return;
        }
    }

    sendVerificationEmail(): void {
        // send verification email
    }

    toggleNewPasswordVisibility(): void {
        this.newPasswordVisible = !this.newPasswordVisible;
    }

    toggleConfirmPasswordVisibility(): void {
        this.confirmPasswordVisible = !this.confirmPasswordVisible;
    }

    checkPasswordStrength(password: string): void {
        this.passLength = /^.{8,16}$/.test(password);
        this.specialFlag = /[!"#$%&'()*+,-./:;<=>?@[\]^`{|}~]+/.test(password);
        this.numberFlag = /[0-9]/.test(password);
        this.upperFlag = /[A-Z]/.test(password);
        this.lowerFlag = /[a-z]/.test(password);
    }

    checkPasswords(group: FormGroup): any {
        const pass = group.get('newPassword').value;
        const confirmPass = group.get('confirmPassword').value;
        return pass === confirmPass ? null : { passwordsDoNotMatch: true };
    }

    getEmptyStateTitle(): string {
        const title = `Welcome, ${this.firstNameFormControl.value} ${this.lastNameFormControl.value}!`;
        return title;
    }

    getEmptyStateDescription(): string {
        const description = `Your account has been successfully created with the email ${this.emailFormControl.value}. Your account has already been added to the organization. Press continue below to continue.`;
        return description;
    }

    canContinue(): boolean {
        switch (this.currentPageId) {
            case 0:
                return !(this.emailFormControl.value && this.emailFormControl.valid);
            case 1:
                return !this.confirmAgreement;
            case 2:
                return !this.verificationCodeFormControl.value;
            case 3:
                return !(
                    this.passwordFormGroup.get('newPassword').value &&
                    this.passLength &&
                    this.specialFlag &&
                    this.numberFlag &&
                    this.upperFlag &&
                    this.lowerFlag &&
                    this.passwordFormGroup.get('confirmPassword').value &&
                    this.passwordFormGroup.valid
                );
            case 4:
                return !(
                    this.firstNameFormControl.value &&
                    this.firstNameFormControl.valid &&
                    this.lastNameFormControl.value &&
                    this.lastNameFormControl.valid
                );
            default:
                return;
        }
    }

    goBack(): void {
        if (this.currentPageId === 0) {
            this.navigateToLogin();
        } else {
            this.currentPageId = this.currentPageId - 1;
        }
    }

    next(): void {
        this.currentPageId = this.currentPageId + 1;
    }

    navigateToLogin(): void {
        void this._router.navigate([`${this._config.authRoute}/${LOGIN_ROUTE}`]);
    }
}
