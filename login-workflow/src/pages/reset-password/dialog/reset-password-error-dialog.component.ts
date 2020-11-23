import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'pxb-reset-password-error-dialog',
    template: `
        <div class="mat-h2">Error!</div>
        <div class="mat-subheading-2">Sorry, there was a problem resetting your password.</div>
        <div style="display: flex; justify-content: flex-end; margin-top: 24px;">
            <button mat-stroked-button (click)="dialogRef.close()">Okay</button>
        </div>
    `,
})
export class PxbResetPasswordDialogComponent {
    constructor(public dialogRef: MatDialogRef<PxbResetPasswordDialogComponent>) {}
}
