import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PxbForgotPasswordErrorDialogComponent } from './forgot-password-error-dialog.component';

@Injectable({
    providedIn: 'root',
})
export class PxbForgotPasswordErrorDialogService {
    // TODO: implements CustomDialog
    constructor(public dialog: MatDialog) {}

    openDialog(): MatDialogRef<PxbForgotPasswordErrorDialogComponent> {
        return this.dialog.open(PxbForgotPasswordErrorDialogComponent, {
            disableClose: true,
        });
    }
}
