import { Injectable } from '@angular/core';
import { MatLegacyDialog as MatDialog, MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';
import { BluiAuthErrorDialogComponent } from '../../components/error-dialog/error-dialog.component';
import { IBluiAuthErrorDialogService, ErrorDialogData } from './error-dialog.service';

@Injectable({
    providedIn: 'root',
})
export class BluiChangePasswordErrorDialogService implements IBluiAuthErrorDialogService {
    constructor(public dialog: MatDialog) {}

    openDialog(data: ErrorDialogData): MatDialogRef<BluiAuthErrorDialogComponent> {
        return this.dialog.open(BluiAuthErrorDialogComponent, {
            disableClose: true,
            data,
        });
    }
}
