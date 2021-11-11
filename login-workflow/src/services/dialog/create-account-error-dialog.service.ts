import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { BluiAuthErrorDialogComponent } from '../../components/error-dialog/error-dialog.component';
import { IBluiAuthErrorDialogService, ErrorDialogData } from './error-dialog.service';

@Injectable({
    providedIn: 'root',
})
export class BluiCreateAccountErrorDialogService implements IBluiAuthErrorDialogService {
    constructor(public dialog: MatDialog) {}

    openDialog(data: ErrorDialogData): MatDialogRef<BluiAuthErrorDialogComponent> {
        return this.dialog.open(BluiAuthErrorDialogComponent, {
            disableClose: true,
            data,
        });
    }
}
