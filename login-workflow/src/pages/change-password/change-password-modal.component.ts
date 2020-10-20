import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
    templateUrl: './change-password-modal.component.html',
    styleUrls: ['./change-password-modal.component.scss'],
})
export class PxbChangePasswordModalComponent {
    constructor(public dialogRef: MatDialogRef<PxbChangePasswordModalComponent>) {}

    cancel(): void {
        this.dialogRef.close('cancel');
    }
}
