import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, ValidatorFn } from '@angular/forms';

import { BluiAuthConfig } from './../../../../services/config/auth-config';
import { BluiAuthTranslations } from '../../../../translations/auth-translations';
import { BluiAuthSecurityService } from '../../../../services/state/auth-security.service';
import { EmailFieldComponent } from '../../../../components/email-field/email-field.component';

@Component({
    selector: 'blui-create-account-provide-email-step',
    template: `
        <div class="mat-title blui-auth-title" [innerHTML]="translate.CREATE_ACCOUNT.ENTER_EMAIL.TITLE"></div>
        <p
            class="mat-body-1"
            style="margin-bottom: 24px; margin-top: 0px"
            [innerHTML]="translate.CREATE_ACCOUNT.ENTER_EMAIL.INSTRUCTIONS"
        ></p>
        <mat-divider class="blui-auth-divider" style="margin-top: 16px; margin-bottom: 32px;"></mat-divider>
        <div class="blui-auth-full-height">
            <form>
                <blui-email-field
                    [rememberRegistrationEmail]="true"
                    [customEmailValidator]="customEmailValidator"
                    (enter)="advance.emit()"
                    (edit)="updateEmail($event)"
                ></blui-email-field>
            </form>
        </div>
    `,
})
export class BluiProvideEmailComponent implements OnInit {
    @Input() email: string;
    @Input() isValidEmail: boolean;
    @Input() customEmailValidator: ValidatorFn;

    @Output() emailChange: EventEmitter<string> = new EventEmitter<string>();
    @Output() isValidEmailChange: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() advance: EventEmitter<void> = new EventEmitter<void>();

    @ViewChild(EmailFieldComponent) emailFieldComponent: EmailFieldComponent;

    emailFormControl: FormControl;
    translate: BluiAuthTranslations;

    constructor(
        private readonly _bluiAuthConfig: BluiAuthConfig,
        private readonly _bluiSecurityService: BluiAuthSecurityService
    ) {}

    ngOnInit(): void {
        this.translate = this._bluiAuthConfig.getTranslations();
    }

    ngAfterViewInit(): void {
        this.emailFormControl = this.emailFieldComponent.emailFormControl;
        if (this.emailFormControl.valid) {
            this.isValidEmailChange.emit(this.emailFormControl.valid);
        }
    }

    updateEmail(email: string): void {
        this.emailChange.emit(email);
        this.isValidEmailChange.emit(this.emailFormControl.valid);
        this._bluiSecurityService.updateSecurityState({
            registrationEmail: this.emailFormControl.valid ? this.emailFormControl.value : '',
        });
    }
}
