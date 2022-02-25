import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { BluiChangePasswordDialogComponent } from './change-password-dialog.component';

@Injectable({
    providedIn: 'root',
})
export class BluiChangePasswordDialogService {
    constructor(public dialog: MatDialog) {}

    openDialog(): MatDialogRef<BluiChangePasswordDialogComponent> {
        return this.dialog.open(BluiChangePasswordDialogComponent, {
            width: '444px',
            disableClose: true,
            panelClass: 'blui-change-password-dialog',
        });
    }

    closeDialog(): void {
        this.dialog.closeAll();
    }
}
