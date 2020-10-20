import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PxbChangePasswordModalComponent } from './change-password-modal.component';

@Injectable({
    providedIn: 'root',
})
export class PxbChangePasswordModalService {
    constructor(public dialog: MatDialog) {}

    openDialog(): MatDialogRef<PxbChangePasswordModalComponent> {
        return this.dialog.open(PxbChangePasswordModalComponent, {
            width: '444px',
            height: '730px',
            disableClose: true,
        });
    }

    closeDialog(): void {
        this.dialog.closeAll();
    }
}
