import {AfterViewInit, ChangeDetectorRef, Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { BluiAuthUIService } from '../../services/api';
import { BluiAuthSecurityService } from '../../services/state/auth-security.service';
import { AUTH_ROUTES } from '../../auth/auth.routes';
import { BluiAuthConfig } from '../../services/config/auth-config';
import { PasswordRequirement } from '../../components/password-strength-checker/blui-password-strength-checker.component';
import { BluiChangePasswordErrorDialogService } from '../../services/dialog/change-password-error-dialog.service';
import { ErrorDialogData } from '../../services/dialog/error-dialog.service';
import { BluiFormsService } from '../../services/forms/forms.service';
import { BluiAuthTranslations } from '../../translations/auth-translations';
import { PasswordFieldComponent } from '../../components/password-field/password-field.component';

@Component({
    selector: 'blui-change-password',
    templateUrl: './change-password.component.html',
    styleUrls: ['./change-password.component.scss'],
    host: {
        class: 'blui-change-password',
    },
})
export class BluiChangePasswordComponent implements OnInit, AfterViewInit {
    @ViewChild('currentPasswordField') currentPasswordComponent: PasswordFieldComponent;
    @ViewChild('newPasswordField') newPasswordComponent: PasswordFieldComponent;
    @ViewChild('confirmPasswordField') confirmPasswordComponent: PasswordFieldComponent;

    currentPasswordFormControl: FormControl;
    newPasswordFormControl: FormControl;
    confirmPasswordFormControl: FormControl;

    passwordRequirements: PasswordRequirement[];

    isLoading = false;
    passesStrengthCheck = false;
    passwordChangeSuccess = false;
    passwordsMatch = false;

    translate: BluiAuthTranslations;

    @Output() close: EventEmitter<void> = new EventEmitter();

    constructor(
        private readonly _router: Router,
        private readonly _formBuilder: FormBuilder,
        private readonly _bluiAuthConfig: BluiAuthConfig,
        private readonly _bluiFormsService: BluiFormsService,
        private readonly _bluiAuthUIService: BluiAuthUIService,
        private readonly _changeDetectorRef: ChangeDetectorRef,
        private readonly _bluiSecurityService: BluiAuthSecurityService,
        private readonly _bluiChangePasswordErrorDialogService: BluiChangePasswordErrorDialogService
    ) {}

    ngOnInit(): void {
        this.translate = this._bluiAuthConfig.getTranslations();
        this.passwordRequirements = this._bluiAuthConfig.getPasswordRequirements();
    }

    ngAfterViewInit(): void {
        this.currentPasswordFormControl = this.currentPasswordComponent.passwordFormControl;
        this.newPasswordFormControl = this.newPasswordComponent.passwordFormControl;
        this.confirmPasswordFormControl = this.confirmPasswordComponent.passwordFormControl;
        this._changeDetectorRef.detectChanges();
    }

    closeDialog(): void {
        this.close.emit();
    }

    done(): void {
        this.closeDialog();
        void this._router.navigate([`${AUTH_ROUTES.AUTH_WORKFLOW}/${AUTH_ROUTES.LOGIN}`]);
    }

    changePassword(): void {
        const oldPassword = this.currentPasswordFormControl.value;
        const newPassword = this.newPasswordFormControl.value;
        this.isLoading = true;
        this._bluiAuthUIService
            .changePassword(oldPassword, newPassword)
            .then(() => {
                this.passwordChangeSuccess = true;
                this._bluiSecurityService.onUserNotAuthenticated();
                this.isLoading = false;
            })
            .catch((data: ErrorDialogData) => {
                this.passwordChangeSuccess = false;
                this.isLoading = false;
                this._bluiChangePasswordErrorDialogService.openDialog(data);
            });
    }

    focusNewPassword(): void {
        this._bluiFormsService.advanceToNextField(this.newPasswordComponent.passwordInputElement);
    }

    focusConfirmPassword(): void {
        this._bluiFormsService.advanceToNextField(this.confirmPasswordComponent.passwordInputElement);
    }

    allowPasswordChange(): boolean {
        return (
            this.currentPasswordFormControl &&
            this.currentPasswordFormControl.value &&
            this.passwordsMatch &&
            this.passesStrengthCheck
        );
    }
}
