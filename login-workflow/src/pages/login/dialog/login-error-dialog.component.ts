import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'pxb-login-error-modal',
    template: `
        <div class="mat-h2">Error!</div>
        <div class="mat-subheading-2">Your username/password combination is not recognized.</div>
        <div style="display: flex; justify-content: flex-end; margin-top: 24px;">
            <button mat-stroked-button (click)="dialogRef.close()">Okay</button>
        </div>
    `,
})
export class PxbLoginErrorDialogComponent {
    constructor(public dialogRef: MatDialogRef<PxbLoginErrorDialogComponent>) {}
}
