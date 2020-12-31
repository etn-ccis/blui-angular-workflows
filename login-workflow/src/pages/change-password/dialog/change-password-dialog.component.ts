import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
    template: '<pxb-change-password></pxb-change-password>',
})
export class PxbChangePasswordDialogComponent {
    constructor(public dialogRef: MatDialogRef<PxbChangePasswordDialogComponent>) {}

    cancel(): void {
        this.dialogRef.close('cancel');
    }
}
