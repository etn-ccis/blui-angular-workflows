import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'pxb-create-account-account-details-step',
    styles: [
        `
            .pxb-account-details-form-field {
                width: 100%;
                margin-bottom: 8px;
            }
        `,
    ],
    template: `
        <div class="mat-title pxb-auth-title">Account Details</div>
        <div class="pxb-auth-full-height">
            <p class="mat-body-1" style="margin-bottom: 24px;">
                Enter your details below to complete account creation.
            </p>
            <mat-divider class="pxb-auth-divider" style="margin-top: 16px; margin-bottom: 32px;"></mat-divider>
            <form>
                <mat-form-field appearance="fill" class="pxb-account-details-form-field">
                    <mat-label>First Name</mat-label>
                    <input
                        #pxbFirst
                        id="pxb-first"
                        name="first"
                        matInput
                        [formControl]="firstNameFormControl"
                        (ngModelChange)="emitFirstNameChange(firstNameFormControl.value)"
                        (keyup.enter)="advanceToNextField($event)"
                    />
                    <mat-error *ngIf="firstNameFormControl.hasError('required')">
                        First Name is <strong>required</strong>
                    </mat-error>
                </mat-form-field>
                <mat-form-field appearance="fill" class="pxb-account-details-form-field">
                    <mat-label>Last Name</mat-label>
                    <input
                        #pxbLast
                        id="pxb-last"
                        name="last"
                        matInput
                        [formControl]="lastNameFormControl"
                        (ngModelChange)="emitLastNameChange(lastNameFormControl.value)"
                        (keyup.enter)="advanceToNextField($event)"
                    />
                    <mat-error *ngIf="lastNameFormControl.hasError('required')">
                        Last Name is <strong>required</strong>
                    </mat-error>
                </mat-form-field>
                <mat-form-field appearance="fill" class="pxb-account-details-form-field">
                    <mat-label>Phone Number (optional)</mat-label>
                    <input
                        #pxbPhone
                        id="pxb-phone"
                        name="phone"
                        matInput
                        [formControl]="phoneNumberFormControl"
                        (ngModelChange)="emitPhoneNumberChange(phoneNumberFormControl.value)"
                        (keyup.enter)="advance.emit(true)"
                    />
                </mat-form-field>
            </form>
        </div>
    `,
})
export class PxbAccountDetailsComponent {
    @Input() firstName: string;
    @Input() lastName: string;
    @Input() phoneNumber: string;
    @Input() validAccountDetails: boolean;

    @Output() firstNameChange: EventEmitter<string> = new EventEmitter<string>();
    @Output() lastNameChange: EventEmitter<string> = new EventEmitter<string>();
    @Output() phoneNumberChange: EventEmitter<string> = new EventEmitter<string>();
    @Output() validAccountDetailsChange: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() advance: EventEmitter<boolean> = new EventEmitter<boolean>();

    @ViewChild('pxbLast') lastNameInputElement: ElementRef;
    @ViewChild('pxbPhone') phoneInputElement: ElementRef;

    firstNameFormControl: FormControl;
    lastNameFormControl: FormControl;
    phoneNumberFormControl: FormControl;

    constructor(private readonly _formBuilder: FormBuilder) {}

    ngOnInit(): void {
        this.firstNameFormControl = new FormControl(this.firstName, Validators.required);
        this.lastNameFormControl = new FormControl(this.lastName, Validators.required);
        this.phoneNumberFormControl = new FormControl(this.phoneNumber);
    }

    advanceToNextField(event: any): void {
        switch (event.target.id) {
            case 'pxb-first':
                this.lastNameInputElement.nativeElement.focus();
                break;
            case 'pxb-last':
                this.phoneInputElement.nativeElement.focus();
                break;
            default:
                return;
        }
    }

    canContinue(): boolean {
        return (
            this.firstNameFormControl.value &&
            this.firstNameFormControl.valid &&
            this.lastNameFormControl.value &&
            this.lastNameFormControl.valid
        );
    }

    emitFirstNameChange(firstName: string): void {
        this.firstName = firstName;
        this.firstNameChange.emit(firstName);
        this.validAccountDetails = this.canContinue();
        this.validAccountDetailsChange.emit(this.validAccountDetails);
    }

    emitLastNameChange(lastName: string): void {
        this.lastName = lastName;
        this.lastNameChange.emit(lastName);
        this.validAccountDetails = this.canContinue();
        this.validAccountDetailsChange.emit(this.validAccountDetails);
    }

    emitPhoneNumberChange(phone: string): void {
        this.phoneNumber = phone;
        this.phoneNumberChange.emit(phone);
        this.validAccountDetails = this.canContinue();
        this.validAccountDetailsChange.emit(this.validAccountDetails);
    }
}
