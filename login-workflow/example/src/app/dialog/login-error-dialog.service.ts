import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LoginErrorDialogComponent } from './login-error-dialog.component';
import { IPxbAuthErrorDialogService } from '@pxblue/angular-auth-workflow';

@Injectable({
    providedIn: 'root',
})
export class LoginErrorDialogService implements IPxbAuthErrorDialogService {
    constructor(private dialog: MatDialog) {}

    openDialog(): MatDialogRef<LoginErrorDialogComponent> {
        return this.dialog.open(LoginErrorDialogComponent, {
            disableClose: false,
        });
    }
}
