import { ChangeDetectorRef, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ValidatorFn, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthErrorStateMatcher } from '../../util/matcher';
import { PXB_LOGIN_VALIDATOR_ERROR_NAME } from '../login/login.component';
import { PxbAuthUIService } from '../../services/api/auth-ui.service';
import { AUTH_ROUTES } from '../../auth/auth.routes';
import { PxbAuthConfig } from '../../services/config/auth-config';
import { PxbAuthSecurityService } from '../../services/state/auth-security.service';
import { PxbForgotPasswordErrorDialogService } from '../../services/dialog/forgot-password-error-dialog.service';
import { ErrorDialogData } from '../../services/dialog/error-dialog.service';
import { isEmptyView } from '../../util/view-utils';

@Component({
    selector: 'pxb-forgot-password',
    templateUrl: './forgot-password.component.html',
    styleUrls: ['./forgot-password.component.scss'],
})
export class PxbForgotPasswordComponent implements OnInit {
    @Input() pageTitle = 'Forgot Password';
    @Input() successTitle = 'Email Sent';
    @Input() successDescription = 'A link to reset your password has been sent to ';
    @Input() backButtonText = 'Back';
    @Input() doneButtonText = 'Done';
    @Input() okayButtonText = 'Okay';
    @Input() pageInstructions = `Please enter the account email associated with the account.`;
    @Input() businessResponseDescription: string;
    @Input() phoneContactDescription: string;
    @Input() emailFormLabel = 'Email';
    @Input() includeEmailInSuccessMessage = true;
    @Input() customEmailValidator: ValidatorFn;

    @ViewChild('pageTitleVC') pageTitleEl;
    @ViewChild('successTitleVC') successTitleEl;
    @ViewChild('successDescriptionVC') successDescriptionEl;
    @ViewChild('backButtonTextVC') backButtonTextEl;
    @ViewChild('doneButtonTextVC') doneButtonTextEl;
    @ViewChild('okayButtonTextVC') okayButtonTextEl;
    @ViewChild('pageInstructionsVC') pageInstructionsEl;
    @ViewChild('businessResponseDescriptionVC') businessResponseDescriptionEl;
    @ViewChild('phoneContactDescriptionVC') phoneContactDescriptionEl;

    customErrorName = PXB_LOGIN_VALIDATOR_ERROR_NAME;

    emailFormControl: FormControl;
    matcher = new AuthErrorStateMatcher();
    passwordResetSuccess = false;
    successDescriptionMessage: string;

    isEmpty = (el: ElementRef): boolean => isEmptyView(el);

    constructor(
        private readonly _router: Router,
        private readonly _changeDetectorRef: ChangeDetectorRef,
        private readonly _pxbAuthConfig: PxbAuthConfig,
        private readonly _pxbAuthUIActionsService: PxbAuthUIService,
        private readonly _pxbSecurityService: PxbAuthSecurityService,
        private readonly _pxbForgotPasswordDialogService: PxbForgotPasswordErrorDialogService
    ) {}

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
        if (this.businessResponseDescription === undefined) {
            this.businessResponseDescription = `If this email has an account with Eaton, you will receive a response within <strong>one business day</strong>.`;
        }
        if (this.phoneContactDescription === undefined) {
            this.phoneContactDescription = `For urgent account issues, please call <a class="pxb-auth-link" href="tel:${this._pxbAuthConfig.contactPhone}">${this._pxbAuthConfig.contactPhone}</a>.`;
        }
    }

    navigateToLogin(): void {
        void this._router.navigate([`${AUTH_ROUTES.AUTH_WORKFLOW}/${AUTH_ROUTES.LOGIN}`]);
    }

    resetPassword(): void {
        const email = this.emailFormControl.value;
        this._pxbSecurityService.setLoading(true);
        void this._pxbAuthUIActionsService
            .forgotPassword(email)
            .then(() => {
                this.passwordResetSuccess = true;
                void this._router.navigate([`${AUTH_ROUTES.AUTH_WORKFLOW}/${AUTH_ROUTES.FORGOT_PASSWORD}`]);
                this._pxbSecurityService.setLoading(false);
            })
            .catch((data: ErrorDialogData) => {
                this._pxbForgotPasswordDialogService.openDialog(data);
                this._pxbSecurityService.setLoading(false);
            })
            .then(() => {
                this._changeDetectorRef.detectChanges();
            });
    }
}
