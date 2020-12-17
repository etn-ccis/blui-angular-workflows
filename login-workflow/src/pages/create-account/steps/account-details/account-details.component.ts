import { Component } from '@angular/core';

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
            <ng-content select="[pxb-account-details-form]"></ng-content>
        </div>
    `,
})
export class PxbAccountDetailsComponent {}
