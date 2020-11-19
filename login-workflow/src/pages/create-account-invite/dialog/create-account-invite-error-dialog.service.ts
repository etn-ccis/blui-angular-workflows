import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PxbCreateAccountInviteDialogComponent } from './create-account-invite-error-dialog.component';

@Injectable({
    providedIn: 'root',
})
export class PxbCreateAccountInviteErrorDialogService {
    constructor(public dialog: MatDialog) {}

    openDialog(): MatDialogRef<PxbCreateAccountInviteDialogComponent> {
        return this.dialog.open(PxbCreateAccountInviteDialogComponent, {
            disableClose: true,
        });
    }
}
