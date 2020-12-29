import { Component } from '@angular/core';
import { AbstractControl, FormControl, ValidatorFn, Validators } from '@angular/forms';
import { PxbAuthConfig, AUTH_ROUTES } from '@pxblue/angular-auth-workflow';

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
        <!-- <ng-template #createAccountPage>
            <pxb-create-account
                [accountDetails]="accountDetails"
                [hasValidAccountDetails]="accountDetailsValid()"
                [userName]="firstNameFormControl.value + ' ' + lastNameFormControl.value"
            >
                <template pxb-account-details-form [ngTemplateOutlet]="accountDetailsRef"></template>
            </pxb-create-account>
        </ng-template> -->

        <!-- Custom Create Account via Invite page -->
        <!-- <ng-template #createAccountViaInvitePage>
            <pxb-create-account-invite
                [accountDetails]="accountDetails"
                [hasValidAccountDetails]="accountDetailsValid()"
                [userName]="firstNameFormControl.value + ' ' + lastNameFormControl.value"
            >
                <template pxb-account-details-form [ngTemplateOutlet]="accountDetailsRef"></template>
            </pxb-create-account-invite>
        </ng-template> -->

        <!-- This is an example of a custom account details form.  To enable the defaults, remove this template and the accountDetails[]. -->
        <!-- <ng-template #accountDetailsRef>
            <form>
                <mat-form-field appearance="fill" [style.width.%]="100" [style.marginBottom.px]="8">
                    <mat-label>First Name</mat-label>
                    <input matInput [formControl]="firstNameFormControl" required />
                    <mat-error *ngIf="firstNameFormControl.hasError('required')">
                        First Name is <strong>required</strong>
                    </mat-error>
                </mat-form-field>
                <mat-form-field appearance="fill" [style.width.%]="100" [style.marginBottom.px]="8">
                    <mat-label>Last Name</mat-label>
                    <input matInput [formControl]="lastNameFormControl" required />
                    <mat-error *ngIf="lastNameFormControl.hasError('required')">
                        Last Name is <strong>required</strong>
                    </mat-error>
                </mat-form-field>
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
                <mat-form-field appearance="fill" [style.width.%]="100" [style.marginBottom.px]="8">
                    <mat-label>Phone Number (optional)</mat-label>
                    <input matInput [formControl]="phoneNumberFormControl" />
                </mat-form-field>
            </form>
        </ng-template> -->

        <!-- This is what accepts all page customizations and renders on screen. !-->
        <pxb-auth [loginRef]="loginPage">
        </pxb-auth>
    `,
})
export class AuthComponent {
    firstNameFormControl: FormControl;
    lastNameFormControl: FormControl;
    countryFormControl: FormControl;
    phoneNumberFormControl: FormControl;
    accountDetails: FormControl[];

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

    ngOnInit(): void {
        // this.initCreateAccountFormControls();
    }

    // initCreateAccountFormControls(): void {
    //     this.firstNameFormControl = new FormControl('', Validators.required);
    //     this.lastNameFormControl = new FormControl('', Validators.required);
    //     this.countryFormControl = new FormControl('', Validators.required);
    //     this.phoneNumberFormControl = new FormControl('');
    //     this.accountDetails = [
    //         this.firstNameFormControl,
    //         this.lastNameFormControl,
    //         this.countryFormControl,
    //         this.phoneNumberFormControl,
    //     ];
    // }

    // accountDetailsValid(): boolean {
    //     return (
    //         this.firstNameFormControl.value &&
    //         this.firstNameFormControl.valid &&
    //         this.lastNameFormControl.value &&
    //         this.lastNameFormControl.valid &&
    //         this.countryFormControl.value &&
    //         this.countryFormControl.valid
    //     );
    // }

    customValidator(): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } | null => {
            const forbidden = /test/i.test(control.value);
            return forbidden
                ? { PXB_LOGIN_VALIDATOR_ERROR_NAME: { message: 'This is a custom error, provided by end user' } }
                : null;
        };
    }
}
