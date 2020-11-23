import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { PxbAuthConfig } from '../../../../services/config/auth-config';
import { AuthErrorStateMatcher } from '../../../../util/matcher';

@Component({
    selector: 'pxb-create-account-provide-email-step',
    template: `
        <div class="mat-title pxb-auth-title">Create an Account</div>
        <p class="mat-body-1" style="margin-bottom: 24px;">
            To register for an Eaton account, enter the required information below. You will need to verify your email
            address to continue.
        </p>
        <mat-divider class="pxb-auth-divider" style="margin-top: 16px; margin-bottom: 32px;"></mat-divider>
        <div class="pxb-auth-full-height">
            <form>
                <mat-form-field appearance="fill" style="width: 100%;">
                    <mat-label>Email Address</mat-label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        matInput
                        [formControl]="emailFormControl"
                        (ngModelChange)="updateEmail(emailFormControl.value)"
                        [errorStateMatcher]="emailMatcher"
                    />
                    <mat-error *ngIf="emailFormControl.hasError('email') && !emailFormControl.hasError('required')">
                        Please enter a valid email address
                    </mat-error>
                    <mat-error *ngIf="emailFormControl.hasError('required')">
                        Email is <strong>required</strong>
                    </mat-error>
                </mat-form-field>
            </form>
        </div>
    `,
})
export class PxbCreateAccountProvideEmailComponent {
    @Input() email: string;
    @Input() isValidEmail: boolean;

    @Output() emailChange: EventEmitter<string> = new EventEmitter<string>();
    @Output() isValidEmailChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    emailMatcher = new AuthErrorStateMatcher();
    emailFormControl: FormControl;

    constructor(private readonly _pxbAuthConfig: PxbAuthConfig, private readonly _formBuilder: FormBuilder) {}

    ngOnInit(): void {
        const emailValidators = [
            Validators.required,
            Validators.email,
            Validators.pattern(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i),
        ];
        this.emailFormControl = new FormControl('', emailValidators);
    }

    updateEmail(email: string): void {
        this.emailChange.emit(email);
        this.isValidEmailChange.emit(this.emailFormControl.valid);
    }
}
