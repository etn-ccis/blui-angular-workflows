import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PxbChangePasswordDialogComponent } from './change-password-dialog.component';

@Injectable({
    providedIn: 'root',
})
export class PxbChangePasswordDialogService {
    pageTitle = 'Change Password';
    pageDescription =
        'Please select a password. Make sure that your password meets the necessary complexity requirements outlined below.';
    currentPasswordFormLabel = 'Current Password';
    passwordFormLabel = 'Password';
    confirmPasswordFormLabel = 'Confirm Password';
    passwordMismatchError = 'Passwords do not match';
    passwordChangeSuccessTitle = 'Password Changed';
    passwordChangeSuccessDescription =
        "Your password was successfully updated! To ensure your account's security, you will need to log in to the application with your updated credentials.";
    loginButtonText = 'Log In';
    backButtonText = 'Back';
    okayButtonText = 'Okay';

    constructor(public dialog: MatDialog) {}

    openDialog(): MatDialogRef<PxbChangePasswordDialogComponent> {
        return this.dialog.open(PxbChangePasswordDialogComponent, {
            width: '444px',
            height: '710px',
            disableClose: true,
            panelClass: 'pxb-change-password-dialog',
        });
    }

    closeDialog(): void {
        this.dialog.closeAll();
    }
}
