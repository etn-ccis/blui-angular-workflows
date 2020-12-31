import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PxbAuthErrorDialogComponent } from '../../components/error-dialog/error-dialog.component';
import { IPxbAuthErrorDialogService, ErrorDialogData } from './error-dialog.service';

@Injectable({
    providedIn: 'root',
})
export class PxbResetPasswordErrorDialogService implements IPxbAuthErrorDialogService {
    constructor(public dialog: MatDialog) {}

    openDialog(data: ErrorDialogData): MatDialogRef<PxbAuthErrorDialogComponent> {
        return this.dialog.open(PxbAuthErrorDialogComponent, {
            disableClose: true,
            data,
        });
    }
}
