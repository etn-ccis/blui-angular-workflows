import { Component } from '@angular/core';
import { MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';

@Component({
    selector: 'app-login-error-modal',
    template: `
        <div style="max-width: 300px">
            <div class="mat-h2">Custom Login Error</div>
            <div class="mat-subheading-2">
                This account needs to be approved manually by your station manager; please allow 24 hours for
                activation. If it has been more than 24 hours, please
                <a class="pxb-auth-link" [href]="'tel:' + '111111111'">call</a> your station manager.
            </div>
            <div style="display: flex; justify-content: flex-end">
                <button
                    mat-stroked-button
                    color="primary"
                    style="width: 100px; margin-top: 32px"
                    (click)="dialogRef.close()"
                >
                    Okay
                </button>
            </div>
        </div>
    `,
})
export class LoginErrorDialogComponent {
    constructor(public dialogRef: MatDialogRef<LoginErrorDialogComponent>) {}
}
