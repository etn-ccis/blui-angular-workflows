import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { EmailFieldComponent } from './email-field/email-field.component';
import { LoadingOverlayComponent } from './loading-overlay/loading-overlay.component';
import { PasswordStrengthCheckComponent } from './password-strength-checker/password-strength-checker.component';
import { PasswordFieldComponent } from './password-field/password-field.component';
import { PxbAuthErrorDialogComponent } from './error-dialog/error-dialog.component';
import { PxbPasswordStrengthCheckerComponent } from './password-strength-checker/pxb-password-strength-checker.component';

@NgModule({
    declarations: [
        EmailFieldComponent,
        LoadingOverlayComponent,
        PasswordFieldComponent,
        PasswordStrengthCheckComponent,
        PxbAuthErrorDialogComponent,
        PxbPasswordStrengthCheckerComponent,
    ],
    entryComponents: [PxbAuthErrorDialogComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        CommonModule,
        MatButtonModule,
        MatDividerModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatProgressSpinnerModule,
        ReactiveFormsModule,
    ],
    exports: [
        EmailFieldComponent,
        LoadingOverlayComponent,
        PasswordFieldComponent,
        PasswordStrengthCheckComponent,
        PxbAuthErrorDialogComponent,
        PxbPasswordStrengthCheckerComponent,
    ],
})
export class PxbCommonComponentsModule {}
