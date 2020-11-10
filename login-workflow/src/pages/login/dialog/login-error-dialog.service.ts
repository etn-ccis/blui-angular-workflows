import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PxbLoginErrorDialogComponent } from './login-error-dialog.component';

@Injectable({
    providedIn: 'root',
})
export class PxbLoginErrorDialogService { // TODO: implements CustomDialog
    constructor(public dialog: MatDialog) {}

    openDialog(): MatDialogRef<PxbLoginErrorDialogComponent> {
        return this.dialog.open(PxbLoginErrorDialogComponent, {
            disableClose: true,
        });
    }
}
