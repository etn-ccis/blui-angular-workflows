import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'pxb-change-password-error-dialog',
    template: `
        <div class="mat-h2">Error!</div>
        <div class="mat-subheading-2">Unable to change your password.</div>
        <div style="display: flex; justify-content: flex-end; margin-top: 24px;">
            <button mat-stroked-button (click)="dialogRef.close()">Okay</button>
        </div>
    `,
})
export class PxbChangePasswordErrorDialogComponent {
    constructor(public dialogRef: MatDialogRef<PxbChangePasswordErrorDialogComponent>) {}
}
