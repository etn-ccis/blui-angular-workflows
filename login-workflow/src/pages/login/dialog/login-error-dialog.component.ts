import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'pxb-login-error-modal',
    template:
    `
      <mat-card>
        <div>Error</div>
        Your username/password combination is not recognized.
        <button>Okay</button>
      </mat-card>
    `
})
export class PxbLoginErrorDialogComponent {
    constructor(public dialogRef: MatDialogRef<PxbLoginErrorDialogComponent>) {}

    cancel(): void {
        this.dialogRef.close('cancel');
    }
}
