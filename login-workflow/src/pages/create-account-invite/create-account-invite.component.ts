import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthErrorStateMatcher } from '../../util/matcher';
import { PXB_LOGIN_VALIDATOR_ERROR_NAME } from '../public-api';
import { PXB_AUTH_CONFIG, PxbAuthConfig } from '../../config/auth-config';
import { LOGIN_ROUTE } from '../../config/route-names';
import { SAMPLE_EULA } from '../../constants/sampleEula';
import { ErrorStateMatcher } from '@angular/material';

class CrossFieldErrorMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        return control.dirty && form.invalid;
    }
}

@Component({
    selector: 'pxb-create-account-invite',
    templateUrl: './create-account-invite.component.html',
    styleUrls: ['./create-account-invite.component.scss'],
})
export class PxbCreateAccountInviteComponent implements OnInit {
    @Input() email: string = "testemail@email.com";
    @Input() licenseAgreement: string = SAMPLE_EULA;
    pageCount: number = 4;
    currentPageId: number;
    customErrorName = PXB_LOGIN_VALIDATOR_ERROR_NAME;
    confirmAgreement: boolean = false;
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
                newPassword: ['', Validators.required],
                confirmPassword: ['', Validators.required],
            },
            {
                validator: this.checkPasswords,
            }
        );
     }

    ngOnInit(): void {
        this.currentPageId = 0;

        this.firstNameFormControl = new FormControl('', Validators.required);
        this.lastNameFormControl = new FormControl('', Validators.required);
        this.phoneNumberFormControl = new FormControl('');
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
                return 'Account Created!';
        }
    }

    toggleNewPasswordVisibility() {
        this.newPasswordVisible = !this.newPasswordVisible;
    }

    toggleConfirmPasswordVisibility() {
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
        const title = 'Welcome, ' + this.firstNameFormControl.value + ' ' + this.lastNameFormControl.value + '!';
        return title;
    }

    getEmptyStateDescription(): string {
        const description = 'Your account has been successfully created with the email ' + this.email + '. Your account has already been added to the organization. Press continue below to continue.';
        return description;
    }

    canContinue(): boolean {
        switch (this.currentPageId) {
            case 0:
                return !this.confirmAgreement;
            case 1:
                return !(
                    this.passwordFormGroup.get('newPassword').value
                    && this.passLength
                    && this.specialFlag
                    && this.numberFlag
                    && this.upperFlag
                    && this.lowerFlag
                    && this.passwordFormGroup.get('confirmPassword').value
                    && this.passwordFormGroup.valid
                    );
            case 2:
                return !(this.firstNameFormControl.value && this.firstNameFormControl.valid && this.lastNameFormControl.value && this.lastNameFormControl.valid);
        }
    }

    goBack() {
        if (this.currentPageId === 0) {
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
