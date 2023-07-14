import { Injectable } from '@angular/core';
import { MatLegacyDialog as MatDialog, MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';
import { LoginErrorDialogComponent } from './login-error-dialog.component';
import { IBluiAuthErrorDialogService } from '@brightlayer-ui/angular-auth-workflow';

@Injectable({
    providedIn: 'root',
})
export class LoginErrorDialogService implements IBluiAuthErrorDialogService {
    constructor(private dialog: MatDialog) {}

    openDialog(): MatDialogRef<LoginErrorDialogComponent> {
        return this.dialog.open(LoginErrorDialogComponent, {
            disableClose: false,
        });
    }
}
