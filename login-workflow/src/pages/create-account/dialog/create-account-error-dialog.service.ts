import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PxbCreateAccountDialogComponent } from './create-account-error-dialog.component';

@Injectable({
    providedIn: 'root',
})
export class PxbCreateAccountErrorDialogService {
    constructor(public dialog: MatDialog) {}

    openDialog(): MatDialogRef<PxbCreateAccountDialogComponent> {
        return this.dialog.open(PxbCreateAccountDialogComponent, {
            disableClose: true,
        });
    }
}
