import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LoginErrorDialogComponent } from './login-error-dialog.component';

@Injectable({
    providedIn: 'root',
})
export class LoginErrorDialogService {
    constructor(private dialog: MatDialog) {}

    openDialog(): MatDialogRef<LoginErrorDialogComponent> {
        return this.dialog.open(LoginErrorDialogComponent, {
            disableClose: false,
        });
    }
}
