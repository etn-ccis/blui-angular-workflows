import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';

import { LoadingOverlayComponent } from './loading-overlay/loading-overlay.component';
import { PasswordStrengthCheckComponent } from './password-strength-checker/password-strength-checker.component';
import { PxbPasswordStrengthCheckerComponent } from './password-strength-checker/pxb-password-strength-checker.component';
import { PxbAuthErrorDialogComponent } from './error-dialog/error-dialog.component';
import { MatInputModule } from '@angular/material/input';
import { EmailFieldComponent } from './email-field/email-field.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PasswordFieldComponent } from './password-field/password-field.component';

@NgModule({
    declarations: [
        LoadingOverlayComponent,
        PasswordStrengthCheckComponent,
        PxbAuthErrorDialogComponent,
        EmailFieldComponent,
        PasswordFieldComponent,
        PxbPasswordStrengthCheckerComponent,
    ],
    entryComponents: [PxbAuthErrorDialogComponent],
    imports: [
        MatInputModule,
        BrowserModule,
        ReactiveFormsModule,
        CommonModule,
        MatIconModule,
        MatDividerModule,
        MatProgressSpinnerModule,
        MatButtonModule,
        MatListModule,
    ],
    exports: [
        LoadingOverlayComponent,
        PasswordStrengthCheckComponent,
        PxbAuthErrorDialogComponent,
        EmailFieldComponent,
        PasswordFieldComponent,
        PxbPasswordStrengthCheckerComponent,
    ],
})
export class PxbCommonComponentsModule {}
