import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { BluiFormsService } from '../../../../services/forms/forms.service';
import { BluiAuthConfig } from '../../../../services/config/auth-config';

import { BluiAuthTranslations } from '../../../../translations/auth-translations';

@Component({
    selector: 'blui-create-account-account-details-step',
    styleUrls: ['account-details.component.scss'],
    template: `
        <div
            class="mat-title blui-auth-title"
            [innerHTML]="pageTitle || translate.CREATE_ACCOUNT.ACCOUNT_DETAILS.TITLE"
        ></div>
        <div class="blui-auth-full-height">
            <p
                class="mat-body-1"
                style="margin-bottom: 24px;"
                [innerHTML]="pageInstructions || translate.CREATE_ACCOUNT.ACCOUNT_DETAILS.INSTRUCTIONS"
            ></p>
            <mat-divider class="blui-auth-divider" style="margin-top: 16px; margin-bottom: 32px;"></mat-divider>
            <div class="blui-account-details-body">
                <form>
                    <ng-container *ngIf="showDefaultAccountDetails">
                        <mat-form-field appearance="fill">
                            <mat-label>{{ translate.CREATE_ACCOUNT.ACCOUNT_DETAILS.FIRST_NAME_FORM_LABEL }}</mat-label>
                            <input
                                #BluiFirst
                                id="blui-first"
                                name="first"
                                matInput
                                [attr.maxLength]="firstNameMaxLength ? firstNameMaxLength : null"
                                [formControl]="firstNameFormControl"
                                required
                                (ngModelChange)="emitIfValid(); firstNameChange.emit(firstNameFormControl.value)"
                                (keyup.enter)="BluiFormsService.advanceToNextField(lastNameInputElement)"
                            />
                            <mat-error
                                *ngIf="firstNameFormControl.hasError('required')"
                                [innerHTML]="
                                    translate.GENERAL.IS_REQUIRED_ERROR(
                                        translate.CREATE_ACCOUNT.ACCOUNT_DETAILS.FIRST_NAME_FORM_LABEL
                                    )
                                "
                            >
                            </mat-error>
                        </mat-form-field>
                        <mat-form-field appearance="fill">
                            <mat-label>{{ translate.CREATE_ACCOUNT.ACCOUNT_DETAILS.LAST_NAME_FORM_LABEL }}</mat-label>
                            <input
                                matInput
                                #bluiLast
                                id="blui-last"
                                name="last"
                                [attr.maxLength]="lastNameMaxLength ? lastNameMaxLength : null"
                                [formControl]="lastNameFormControl"
                                required
                                (ngModelChange)="emitIfValid(); lastNameChange.emit(lastNameFormControl.value)"
                                (keyup.enter)="advance.emit()"
                            />
                            <mat-error
                                *ngIf="lastNameFormControl.hasError('required')"
                                [innerHTML]="
                                    translate.GENERAL.IS_REQUIRED_ERROR(
                                        translate.CREATE_ACCOUNT.ACCOUNT_DETAILS.LAST_NAME_FORM_LABEL
                                    )
                                "
                            >
                            </mat-error>
                        </mat-form-field>
                    </ng-container>
                    <ng-content select="[blui-account-details]"></ng-content>
                </form>
            </div>
        </div>
    `,
})
/* Default Account Details consists of a First/Last Name (required) and a phone number (optional). */
export class BluiAccountDetailsComponent implements OnInit {
    @Input() showDefaultAccountDetails = false; // Used to hide defaults whenever there are custom account detail forms.
    @Input() firstName: string;
    @Input() lastName: string;
    @Input() pageTitle: string;
    @Input() pageInstructions: string;
    @Output() firstNameChange: EventEmitter<string> = new EventEmitter<string>();
    @Output() lastNameChange: EventEmitter<string> = new EventEmitter<string>();
    @Output() accountNameValid = new EventEmitter<boolean>();
    @Output() advance: EventEmitter<void> = new EventEmitter<void>();

    @ViewChild('bluiLast') lastNameInputElement: ElementRef;

    firstNameFormControl: FormControl;
    lastNameFormControl: FormControl;

    lastNameMaxLength: number;
    firstNameMaxLength: number;

    translate: BluiAuthTranslations;

    constructor(public BluiFormsService: BluiFormsService, private readonly _BluiAuthConfig: BluiAuthConfig) {}

    ngOnInit(): void {
        this.translate = this._BluiAuthConfig.getTranslations();
        if (this.showDefaultAccountDetails) {
            this.firstNameFormControl = new FormControl(this.firstName, Validators.required);
            this.lastNameFormControl = new FormControl(this.lastName, Validators.required);
        }
        this.firstNameMaxLength = this._BluiAuthConfig.customFirstNameRequirements?.maxLength;
        this.lastNameMaxLength = this._BluiAuthConfig.customLastNameRequirements?.maxLength;
    }

    /* If we are using the default account details, we need to provide the input validation required for the 'NEXT' button. */
    emitIfValid(): void {
        let isValid = true;

        /* Check for required values */
        isValid = isValid && this.firstNameFormControl.value;
        isValid = isValid && this.lastNameFormControl.value;
        this.accountNameValid.emit(isValid);
    }
}
