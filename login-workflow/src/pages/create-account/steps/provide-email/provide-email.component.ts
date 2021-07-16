import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, ValidatorFn } from '@angular/forms';

import { PxbAuthConfig } from './../../../../services/config/auth-config';
import { PxbAuthTranslations } from '../../../../translations/auth-translations';
import { PxbAuthSecurityService } from '../../../../services/state/auth-security.service';
import { EmailFieldComponent } from '../../../../components/email-field/email-field.component';

@Component({
    selector: 'pxb-create-account-provide-email-step',
    template: `
        <div class="mat-title pxb-auth-title" [innerHTML]="translate.CREATE_ACCOUNT.ENTER_EMAIL.TITLE"></div>
        <p
            class="mat-body-1"
            style="margin-bottom: 24px;"
            [innerHTML]="translate.CREATE_ACCOUNT.ENTER_EMAIL.INSTRUCTIONS"
        ></p>
        <mat-divider class="pxb-auth-divider" style="margin-top: 16px; margin-bottom: 32px;"></mat-divider>
        <div class="pxb-auth-full-height">
            <form>
                <pxb-email-field
                    [rememberUserEmail]="true"
                    [customEmailValidator]="customEmailValidator"
                    (enter)="advance.emit()"
                    (edit)="updateEmail($event)"
                ></pxb-email-field>
            </form>
        </div>
    `,
})
export class PxbProvideEmailComponent implements OnInit {
    @Input() email: string;
    @Input() isValidEmail: boolean;
    @Input() customEmailValidator: ValidatorFn;

    @Output() emailChange: EventEmitter<string> = new EventEmitter<string>();
    @Output() isValidEmailChange: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() advance: EventEmitter<void> = new EventEmitter<void>();

    @ViewChild(EmailFieldComponent) emailFieldComponent: EmailFieldComponent;

    emailFormControl: FormControl;
    translate: PxbAuthTranslations;

    constructor(
        private readonly _pxbAuthConfig: PxbAuthConfig,
        private readonly _pxbSecurityService: PxbAuthSecurityService
    ) {}

    ngOnInit(): void {
        this.translate = this._pxbAuthConfig.getTranslations();
    }

    ngAfterViewInit(): void {
        this.emailFormControl = this.emailFieldComponent.emailFormControl;
        if(this.emailFormControl.valid) {
            this.isValidEmailChange.emit(this.emailFormControl.valid);
        }
    }

    updateEmail(email: string): void {
        this.emailChange.emit(email);
        this.isValidEmailChange.emit(this.emailFormControl.valid);
        this._pxbSecurityService.updateSecurityState({ email: this.emailFormControl.valid ? this.emailFormControl.value: '' });
    }
}
