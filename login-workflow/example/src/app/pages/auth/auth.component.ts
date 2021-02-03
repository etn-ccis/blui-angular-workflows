import { Component, TemplateRef, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, ValidatorFn, Validators } from '@angular/forms';
import { MatFormField } from '@angular/material/form-field';
import { AccountDetails, AUTH_ROUTES, PxbAuthConfig, PxbCreateAccountComponent, PxbCreateAccountInviteComponent } from '@pxblue/angular-auth-workflow';

@Component({
    selector: 'app-auth',
    template: `
        <!-- Project-specific login page -->
        <ng-template #loginPage>
            <pxb-login [customEmailValidator]="customValidator()">
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
            <pxb-create-account-invite #createAccountInviteVC [accountDetails]="accountDetails"></pxb-create-account-invite>
        </ng-template>

        <!-- This is an example of a custom account details form.  To enable the defaults, remove this template and the accountDetails[]. -->
        <ng-template #accountDetailsPage1>
            <form>
                <mat-form-field appearance="fill" [style.width.%]="100" [style.marginBottom.px]="8">
                    <mat-label>Country</mat-label>
                    <mat-select [formControl]="countryFormControl" required>
                        <mat-option *ngFor="let country of countries" [value]="country.value">
                            {{ country.viewValue }}
                        </mat-option>
                    </mat-select>
                    <mat-error *ngIf="countryFormControl.hasError('required')">
                        Country is <strong>required</strong>
                    </mat-error>
                </mat-form-field>
                <mat-form-field appearance="fill">
                    <mat-label>Phone Number (optional)</mat-label>
                    <input
                        matInput
                        [formControl]="phoneNumberFormControl"
                        (keyup.enter)="attemptGoNext()"
                    />
                </mat-form-field>
            </form>
        </ng-template>

        <ng-template #accountDetailsPage2>
            <form>
                <mat-form-field appearance="fill">
                    <mat-label>Emergency Contact Number</mat-label>
                    <input
                        matInput
                        [formControl]="emergencyFormControl"
                        required
                        (keyup.enter)="attemptGoNext()"
                    />
                    <mat-error *ngIf="emergencyFormControl.hasError('required')">
                        Emergency Contact is <strong>required</strong>
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
    emergencyFormControl: FormControl;
    accountDetails: AccountDetails[];

  @ViewChild('createAccountVC') createAccountVC: PxbCreateAccountComponent;
  @ViewChild('createAccountInviteVC') createAccountInviteVC: PxbCreateAccountInviteComponent;

    @ViewChild('accountDetailsPage1') accountDetailsPage1: TemplateRef<MatFormField>;
    @ViewChild('accountDetailsPage2') accountDetailsPage2: TemplateRef<MatFormField>;

    countries: any[] = [
        { value: 'US', viewValue: 'US' },
        { value: 'UK', viewValue: 'UK' },
    ];

    constructor(pxbAuthConfig: PxbAuthConfig) {
        pxbAuthConfig.projectImage = 'assets/images/eaton_stacked_logo.png';
        pxbAuthConfig.backgroundImage = 'assets/images/background.svg';
        pxbAuthConfig.allowDebugMode = true;
        pxbAuthConfig.showSelfRegistration = false;
        pxbAuthConfig.passwordRequirements.push({
            regex: /^((?!password).)*$/,
            description: 'Does not contain "password"',
        });
        // If the ON_AUTHENTICATED route is not pre-populated by PXB auth workflow, provide it below.
        if (!AUTH_ROUTES.ON_AUTHENTICATED || AUTH_ROUTES.ON_AUTHENTICATED === '/') {
            AUTH_ROUTES.ON_AUTHENTICATED = 'home';
        }
    }

    ngAfterViewInit(): void {
        this.initCreateAccountFormControls();
    }

    initCreateAccountFormControls(): void {
        this.countryFormControl = new FormControl('', Validators.required);
        this.phoneNumberFormControl = new FormControl('');
        this.emergencyFormControl = new FormControl('', Validators.required);
        this.accountDetails = [
            undefined,
            {
                form: this.accountDetailsPage1,
                formControls: new Map([
                    ['country', this.countryFormControl],
                    ['phoneNumber', this.phoneNumberFormControl],
                ]),
                isValid: () => this.countryFormControl.value,
            },
            {
                form: this.accountDetailsPage2,
                formControls: new Map([['emergencyContact', this.emergencyFormControl]]),
                isValid: () => this.emergencyFormControl.value,
            },
        ];
    }

    customValidator(): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } | null => {
            const forbidden = /test/i.test(control.value);
            return forbidden
                ? { PXB_LOGIN_VALIDATOR_ERROR_NAME: { message: 'This is a custom error, provided by end user' } }
                : null;
        };
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
