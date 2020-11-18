import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'app-login-error-modal',
    template: `
        <div class="mat-h2">Login Attempt Failure</div>
        <div class="mat-subheading-2">This is a custom dialog configured to show whenever a login attempt fails.</div>
        <div style="display: flex; justify-content: flex-end; margin-top: 24px;">
            <button mat-stroked-button (click)="dialogRef.close()">Okay</button>
        </div>
    `,
})
export class LoginErrorDialogComponent {
    constructor(public dialogRef: MatDialogRef<LoginErrorDialogComponent>) {}
}
