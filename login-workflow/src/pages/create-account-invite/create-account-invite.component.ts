import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthErrorStateMatcher } from '../../util/matcher';
import { SAMPLE_EULA } from '../../constants/sampleEula';
import { ErrorStateMatcher } from '@angular/material/core';
import { PXB_LOGIN_VALIDATOR_ERROR_NAME } from '../login/login.component';
import { LOGIN_ROUTE } from '../../auth/auth.routes';

import { PxbAuthConfig } from '../../services/config/auth-config';
import { PxbRegisterUIService } from '../../services/api/register-ui.service';
import { PxbAuthSecurityService } from '../../services/state/auth-security.service';

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
    @Input() email = 'testemail@email.com';
    @Input() licenseAgreement = SAMPLE_EULA;
    pageCount = 4;
    currentPageId: number;
    customErrorName = PXB_LOGIN_VALIDATOR_ERROR_NAME;
    confirmAgreement = false;
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
        private readonly _authConfig: PxbAuthConfig,
        private readonly _formBuilder: FormBuilder,
        private readonly _pxbRegisterService: PxbRegisterUIService,
        private readonly _pxbSecurityService: PxbAuthSecurityService
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
        this.validateRegistrationLink();
    }

    validateRegistrationLink(): void {
        this._pxbSecurityService.setLoading(true);
        this._pxbRegisterService
            .validateUserRegistrationRequest()
            .then(() => {
                this._pxbSecurityService.setLoading(false);
            })
            .catch(() => {
                this._pxbSecurityService.setLoading(false);
            });
    }

    getTitle(): string {
        switch (this.currentPageId) {
            case 0:
                return 'License Agreement';
            case 1:
                return 'Create Password';
            case 2:
                return 'Account Details';
            case 3:
                return 'Account Created!';
            default:
                return;
        }
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
        const description = `Your account has been successfully created with the email ${this.email}. Your account has already been added to the organization. Press continue below to continue.`;
        return description;
    }

    canContinue(): boolean {
        switch (this.currentPageId) {
            case 0:
                return !this.confirmAgreement;
            case 1:
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
            case 2:
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

    resetForm(): void {
        this.confirmAgreement = false;
        this.passwordFormGroup.reset();
        this.firstNameFormControl.reset();
        this.lastNameFormControl.reset();
        this.phoneNumberFormControl.reset();
        this.currentPageId = 0;
    }

    navigateToLogin(): void {
        void this._router.navigate([`${this._authConfig.authRoute}/${LOGIN_ROUTE}`]);
    }
}
