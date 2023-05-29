import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatLegacyFormField as MatFormField } from '@angular/material/legacy-form-field';
import {
    AUTH_ROUTES,
    AccountDetails,
    BluiCreateAccountComponent,
    BluiCreateAccountInviteComponent,
} from '@brightlayer-ui/angular-auth-workflow';
import { Router } from '@angular/router';

@Component({
    selector: 'app-auth',
    template: `
        <!-- Project-specific login page -->
        <ng-template #loginPage>
            <blui-login>
                <div blui-login-header>
                    <img src="assets/images/eaton_stacked_logo.png" style="max-width: 100%; max-height: 80px;" />
                </div>
                <div blui-login-footer style="text-align: center;">
                    <img src="assets/images/cybersecurity_certified.png" style="max-width: 30%; align-self: center;" />
                </div>

                <!--
                <div Blui-login-actions style="text-align: center; margin-bottom: 24px">
                    <button mat-stroked-button style="width: 100%">
                        <mat-icon style="margin-right: 24px">mail_outline</mat-icon>
                        Login with Gmail
                    </button>
                </div>
                -->
            </blui-login>
        </ng-template>

        <!-- Success Screen  -->
        <ng-template #registrationSuccessScreen let-firstName="firstName">
            <!-- Remove this ng-template to restore the default success screen. -->
            <div style="margin: -32px -24px 0 -24px; display: flex; flex-direction: column; flex: 1 1 0">
                <img src="assets/images/wave.svg" style="width: 100%; margin-bottom: 8px;" />
                <div style="text-align: center">
                    <mat-icon
                        style="
                        background-color: #005eab;
                        border-radius: 50%;
                        padding: 8px;
                        color: #e0eff8;
                        height: 48px;
                        font-size: 48px;
                        width: 48px;
                        margin-bottom: 24px"
                        >person</mat-icon
                    >
                </div>
                <div style="margin: 0 24px">
                    <div *ngIf="firstName" class="mat-display-1" style="margin-bottom: 24px">
                        Welcome, {{ firstName }}!
                    </div>
                    <div *ngIf="!firstName" class="mat-display-1" style="margin-bottom: 24px">Welcome!</div>
                    <div class="mat-h4">Your account has been successfully created.</div>
                    <div class="mat-h4">This is a custom success screen.</div>
                    <div class="mat-h4">Press the button below to continue.</div>
                </div>
            </div>
            <mat-divider class="blui-auth-divider blui-auth-action-button-divider"></mat-divider>
            <button mat-stroked-button (click)="navigateToLogin()" color="primary" style="width: 100%; margin-top: 8px">
                Join an Organization
            </button>
            <button mat-flat-button color="primary" (click)="navigateToLogin()" style="width: 100%; margin-top: 16px">
                Continue
            </button>
        </ng-template>

        <ng-template #accountAlreadyExistsSuccessScreen let-firstName="firstName">
            <!-- Remove this ng-template to restore the default success screen. -->
            <div style="margin: -32px -24px 0 -24px; display: flex; flex-direction: column; flex: 1 1 0">
                <img src="assets/images/wave.svg" style="width: 100%; margin-bottom: 8px;" />
                <div style="text-align: center">
                    <mat-icon
                        style="
                        background-color: #005eab;
                        border-radius: 50%;
                        padding: 8px;
                        color: #e0eff8;
                        height: 48px;
                        font-size: 48px;
                        width: 48px;
                        margin-bottom: 24px"
                        >person</mat-icon
                    >
                </div>
                <div style="margin: 0 24px">
                    <div *ngIf="!firstName" class="mat-display-1" style="margin-bottom: 24px">
                        Welcome, Brightlayer Cloud User!
                    </div>
                    <div class="mat-h4">Your registration has been completed successfully.</div>
                    <div class="mat-h4">Please click continue to log in.</div>
                </div>
            </div>
            <mat-divider class="blui-auth-divider blui-auth-action-button-divider"></mat-divider>
            <button mat-flat-button color="primary" (click)="navigateToLogin()" style="width: 100%; margin-top: 16px">
                Continue
            </button>
        </ng-template>

        <!-- Custom Create Account page -->
        <ng-template #createAccountPage>
            <blui-create-account
                #createAccountVC
                [accountDetails]="accountDetails"
                [registrationSuccessScreen]="registrationSuccessScreen"
            ></blui-create-account>
        </ng-template>

        <!-- Custom Create Account page -->
        <ng-template #createAccountViaInvitePage>
            <blui-create-account-invite
                #createAccountInviteVC
                [accountDetails]="accountDetails"
                [existingAccountSuccessScreen]="accountAlreadyExistsSuccessScreen"
            >
            </blui-create-account-invite>
        </ng-template>

        <!-- This is an example of a custom account details form.  To enable the defaults, remove this template and the accountDetails[]. -->
        <ng-template #accountDetailsPage1>
            <form>
                <div style="display: flex;">
                    <mat-form-field appearance="fill" [style.maxWidth.px]="170" id="countryCode">
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
                            id="phoneNumber"
                            matInput
                            required
                            [formControl]="phoneNumberFormControl"
                            (keyup.enter)="attemptGoNext()"
                        />

                        <mat-error *ngIf="phoneNumberFormControl.hasError('required')">
                            Phone number is <strong>required</strong>
                        </mat-error>
                    </mat-form-field>
                </div>
            </form>
        </ng-template>

        <ng-template #accountDetailsPage2>
            <form>
                <mat-form-field appearance="fill" id="company-name">
                    <mat-label>Company</mat-label>
                    <input matInput [formControl]="companyFormControl" placeholder="Where do you work?" required />
                    <mat-error *ngIf="companyFormControl.hasError('required')">
                        Company is <strong>required</strong>
                    </mat-error>
                </mat-form-field>
            </form>
            <form>
                <mat-form-field appearance="fill" id="job-title">
                    <mat-label>Job Title</mat-label>
                    <input
                        matInput
                        [formControl]="jobTitleFormControl"
                        placeholder="What's your title?"
                        required
                        (keyup.enter)="attemptGoNext()"
                    />
                    <mat-error *ngIf="jobTitleFormControl.hasError('required')">
                        Job Title is <strong>required</strong>
                    </mat-error>
                </mat-form-field>
            </form>
        </ng-template>

        <!-- This is what accepts all page customizations and renders on screen. !-->
        <blui-auth
            [loginRef]="loginPage"
            [createAccountRef]="createAccountPage"
            [createAccountInviteRef]="createAccountViaInvitePage"
        ></blui-auth>
    `,
})
export class AuthComponent {
    /* Custom Forms Page 1 */
    countryFormControl: FormControl;
    phoneNumberFormControl: FormControl;

    /* Custom Forms Page 2 */
    companyFormControl: FormControl;
    jobTitleFormControl: FormControl;

    /* Account Details Customizations */
    accountDetails: AccountDetails[];

    @ViewChild('createAccountVC') createAccountVC: BluiCreateAccountComponent;
    @ViewChild('createAccountInviteVC') createAccountInviteVC: BluiCreateAccountInviteComponent;

    @ViewChild('accountDetailsPage1') accountDetailsPage1: TemplateRef<MatFormField>;
    @ViewChild('accountDetailsPage2') accountDetailsPage2: TemplateRef<MatFormField>;

    countries: any[] = [
        { value: 'US', viewValue: '+1 (USA)' },
        { value: 'CAN', viewValue: '+1 (CAN)' },
        { value: 'KZ', viewValue: '+7 (KZ)' },
        { value: 'FRA', viewValue: '+33 (FRA)' },
    ];

    constructor(private readonly _router: Router) {}

    ngAfterViewInit(): void {
        this.initCreateAccountFormControls();
    }

    initCreateAccountFormControls(): void {
        this.countryFormControl = new FormControl('', Validators.required);
        this.phoneNumberFormControl = new FormControl('');
        this.jobTitleFormControl = new FormControl('', Validators.required);
        this.companyFormControl = new FormControl('', Validators.required);
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
                pageTitle: 'Career Details',
                pageInstructions: 'Use the space below to provide <strong>work details</strong>.',
                form: this.accountDetailsPage2,
                formControls: new Map([
                    ['company', this.companyFormControl],
                    ['jobTitle', this.jobTitleFormControl],
                ]),
                isValid: () => this.companyFormControl.value && this.jobTitleFormControl.value,
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

    navigateToLogin(): void {
        void this._router.navigate([`${AUTH_ROUTES.AUTH_WORKFLOW}/${AUTH_ROUTES.LOGIN}`]);
    }
}
