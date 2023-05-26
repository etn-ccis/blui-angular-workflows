import { Component } from '@angular/core';
import { MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';

@Component({
    template: '<blui-change-password (close)="cancel()"></blui-change-password>',
})
export class BluiChangePasswordDialogComponent {
    constructor(public dialogRef: MatDialogRef<BluiChangePasswordDialogComponent>) {}

    cancel(): void {
        this.dialogRef.close('cancel');
    }
}
