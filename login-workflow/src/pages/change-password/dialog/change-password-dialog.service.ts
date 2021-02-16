import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PxbChangePasswordDialogComponent } from './change-password-dialog.component';

@Injectable({
    providedIn: 'root',
})
export class PxbChangePasswordDialogService {

    constructor(public dialog: MatDialog) {}

    openDialog(): MatDialogRef<PxbChangePasswordDialogComponent> {
        return this.dialog.open(PxbChangePasswordDialogComponent, {
            width: '444px',
            height: '710px',
            disableClose: true,
            panelClass: 'pxb-change-password-dialog',
        });
    }

    closeDialog(): void {
        this.dialog.closeAll();
    }
}
