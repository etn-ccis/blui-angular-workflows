import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PxbChangePasswordErrorDialogComponent } from './change-password-error-dialog.component';

@Injectable({
    providedIn: 'root',
})
export class PxbChangePasswordErrorDialogService {
    constructor(public dialog: MatDialog) {}

    openDialog(): MatDialogRef<PxbChangePasswordErrorDialogComponent> {
        return this.dialog.open(PxbChangePasswordErrorDialogComponent, {
            disableClose: true,
        });
    }
}
