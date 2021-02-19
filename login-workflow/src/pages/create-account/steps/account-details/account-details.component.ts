import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { PxbFormsService } from '../../../../services/forms/forms.service';
import { PxbAuthConfig } from '../../../../services/config/auth-config';

import { PxbAuthTranslations } from '../../../../translations/auth-translations';

@Component({
    selector: 'pxb-create-account-account-details-step',
    styleUrls: ['account-details.component.scss'],
    template: `
        <div class="mat-title pxb-auth-title" [innerHTML]="translate.CREATE_ACCOUNT.ACCOUNT_DETAILS.TITLE"></div>
        <div class="pxb-auth-full-height">
            <p
                class="mat-body-1"
                style="margin-bottom: 24px;"
                [innerHTML]="translate.CREATE_ACCOUNT.ACCOUNT_DETAILS.INSTRUCTIONS"
            ></p>
            <mat-divider class="pxb-auth-divider" style="margin-top: 16px; margin-bottom: 32px;"></mat-divider>
            <div class="pxb-account-details-body">
                <form>
                    <ng-container *ngIf="showDefaultAccountDetails">
                        <mat-form-field appearance="fill">
                            <mat-label>{{ translate.CREATE_ACCOUNT.ACCOUNT_DETAILS.FIRST_NAME_FORM_LABEL }}</mat-label>
                            <input
                                #pxbFirst
                                id="pxb-first"
                                name="first"
                                matInput
                                [formControl]="firstNameFormControl"
                                required
                                (ngModelChange)="emitIfValid(); firstNameChange.emit(firstNameFormControl.value)"
                                (keyup.enter)="pxbFormsService.advanceToNextField(lastNameInputElement)"
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
                                #pxbLast
                                id="pxb-last"
                                name="last"
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
                    <ng-content select="[pxb-account-details]"></ng-content>
                </form>
            </div>
        </div>
    `,
})
/* Default Account Details consists of a First/Last Name (required) and a phone number (optional). */
export class PxbAccountDetailsComponent implements OnInit {
    @Input() showDefaultAccountDetails = false; // Used to hide defaults whenever there are custom account detail forms.
    @Input() firstName: string;
    @Input() lastName: string;
    @Output() firstNameChange: EventEmitter<string> = new EventEmitter<string>();
    @Output() lastNameChange: EventEmitter<string> = new EventEmitter<string>();
    @Output() accountNameValid = new EventEmitter<boolean>();
    @Output() advance: EventEmitter<void> = new EventEmitter<void>();

    @ViewChild('pxbLast') lastNameInputElement: ElementRef;

    firstNameFormControl: FormControl;
    lastNameFormControl: FormControl;

    translate: PxbAuthTranslations;

    constructor(public pxbFormsService: PxbFormsService, private readonly _pxbAuthConfig: PxbAuthConfig) {}

    ngOnInit(): void {
        this.translate = this._pxbAuthConfig.getTranslations();
        if (this.showDefaultAccountDetails) {
            this.firstNameFormControl = new FormControl(this.firstName, Validators.required);
            this.lastNameFormControl = new FormControl(this.lastName, Validators.required);
        }
    }

    /* If we are using the default account details, we need to provide the input validation required for the 'NEXT' button. */
    emitIfValid(): void {
        this.accountNameValid.emit(
            this.firstNameFormControl.value &&
                this.firstNameFormControl.valid &&
                this.lastNameFormControl.value &&
                this.lastNameFormControl.valid
        );
    }
}
