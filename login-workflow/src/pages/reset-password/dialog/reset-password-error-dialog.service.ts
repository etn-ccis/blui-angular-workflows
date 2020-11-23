import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PxbResetPasswordDialogComponent } from './reset-password-error-dialog.component';

@Injectable({
    providedIn: 'root',
})
export class PxbResetPasswordErrorDialogService {
    constructor(public dialog: MatDialog) {}

    openDialog(): MatDialogRef<PxbResetPasswordDialogComponent> {
        return this.dialog.open(PxbResetPasswordDialogComponent, {
            disableClose: true,
        });
    }
}
