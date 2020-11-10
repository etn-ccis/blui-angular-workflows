import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'app-login-error-modal',
    template:
    `
      This is a custom dialog error
    `
})
export class LoginErrorDialogComponent {
    constructor(public dialogRef: MatDialogRef<LoginErrorDialogComponent>) {}

    cancel(): void {
        this.dialogRef.close('cancel');
    }
}
