import { Component, TemplateRef, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, ValidatorFn, Validators } from '@angular/forms';
import { MatFormField } from '@angular/material/form-field';
import {
    AccountDetails,
    PxbCreateAccountComponent,
    PxbCreateAccountInviteComponent,
} from '@pxblue/angular-auth-workflow';

@Component({
    selector: 'app-auth',
    template: `
        <!-- Project-specific login page -->
        <ng-template #loginPage>
            <pxb-login>
                <div pxb-login-header>
                    <img src="assets/images/eaton_stacked_logo.png" style="max-width: 100%; max-height: 80px;" />
                </div>
                <div pxb-login-footer style="text-align: center;">
                    <img src="assets/images/cybersecurity_certified.png" style="max-width: 30%; align-self: center;" />
                </div>
            </pxb-login>
        </ng-template>

        <!-- Custom Create Account page -->
        <ng-template #createAccountPage>
            <pxb-create-account #createAccountVC [accountDetails]="accountDetails"></pxb-create-account>
        </ng-template>

        <!-- Custom Create Account page -->
        <ng-template #createAccountViaInvitePage>
            <pxb-create-account-invite #createAccountInviteVC [accountDetails]="accountDetails">
            </pxb-create-account-invite>
        </ng-template>

        <!-- This is an example of a custom account details form.  To enable the defaults, remove this template and the accountDetails[]. -->
        <ng-template #accountDetailsPage1>
            <form>
                <div style="display: flex;">
                    <mat-form-field appearance="fill" [style.maxWidth.px]="170">
                        <mat-label>Country Code</mat-label>
                        <mat-select [formControl]="countryFormControl" required>
                            <mat-option *ngFor="let country of countries" [value]="country.value">
                                {{ country.viewValue }}
                            </mat-option>
                        </mat-select>
                        <mat-error *ngIf="countryFormControl.hasError('required')">
                            Code is <strong>required</strong>
                        </mat-error>
                    </mat-form-field>
                    <mat-form-field appearance="fill" [style.marginLeft.px]="16">
                        <mat-label>Phone Number</mat-label>
                        <input
                            matInput
                            required
                            [formControl]="phoneNumberFormControl"
                            (keyup.enter)="attemptGoNext()"
                        />

                        <mat-error *ngIf="phoneNumberFormControl.hasError('required')">
                            Code is <strong>required</strong>
                        </mat-error>
                    </mat-form-field>
                </div>
            </form>
        </ng-template>

        <ng-template #accountDetailsPage2>
            <form>
                <mat-form-field appearance="fill">
                    <mat-label>Job Title</mat-label>
                    <input matInput [formControl]="jobTitleFromControl" required (keyup.enter)="attemptGoNext()" />
                    <mat-error *ngIf="jobTitleFromControl.hasError('required')">
                        Job Title is <strong>required</strong>
                    </mat-error>
                </mat-form-field>
            </form>
        </ng-template>

        <!-- This is what accepts all page customizations and renders on screen. !-->
        <pxb-auth
            [loginRef]="loginPage"
            [createAccountRef]="createAccountPage"
            [createAccountInviteRef]="createAccountViaInvitePage"
        ></pxb-auth>
    `,
})
export class AuthComponent {
    countryFormControl: FormControl;
    phoneNumberFormControl: FormControl;
    jobTitleFromControl: FormControl;
    accountDetails: AccountDetails[];

    @ViewChild('createAccountVC') createAccountVC: PxbCreateAccountComponent;
    @ViewChild('createAccountInviteVC') createAccountInviteVC: PxbCreateAccountInviteComponent;

    @ViewChild('accountDetailsPage1') accountDetailsPage1: TemplateRef<MatFormField>;
    @ViewChild('accountDetailsPage2') accountDetailsPage2: TemplateRef<MatFormField>;

    countries: any[] = [
        { value: 'US', viewValue: '+1 (USA)' },
        { value: 'CAN', viewValue: '+1 (CAN)' },
        { value: 'KZ', viewValue: '+7 (KZ)' },
        { value: 'FRA', viewValue: '+33 (FRA)' },
    ];

    ngAfterViewInit(): void {
        this.initCreateAccountFormControls();
    }

    initCreateAccountFormControls(): void {
        this.countryFormControl = new FormControl('', Validators.required);
        this.phoneNumberFormControl = new FormControl('');
        this.jobTitleFromControl = new FormControl('', Validators.required);
        this.accountDetails = [
            {
                form: this.accountDetailsPage1,
                formControls: new Map([
                    ['country', this.countryFormControl],
                    ['phoneNumber', this.phoneNumberFormControl],
                ]),
                isValid: () => this.countryFormControl.value && this.phoneNumberFormControl.value,
            },
            {
                form: this.accountDetailsPage2,
                formControls: new Map([['jobTitle', this.jobTitleFromControl]]),
                isValid: () => this.jobTitleFromControl.value,
            },
        ];
    }

    attemptGoNext(): void {
        if (this.createAccountInviteVC) {
            this.createAccountInviteVC.attemptContinue();
        }
        if (this.createAccountVC) {
            this.createAccountVC.attemptContinue();
        }
    }
}
