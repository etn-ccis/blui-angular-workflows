import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { CommonModule } from '@angular/common';
import { MatLegacyProgressSpinnerModule as MatProgressSpinnerModule } from '@angular/material/legacy-progress-spinner';
import { MatLegacyListModule as MatListModule } from '@angular/material/legacy-list';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { EmailFieldComponent } from './email-field/email-field.component';
import { LoadingOverlayComponent } from './loading-overlay/loading-overlay.component';
import { PasswordStrengthCheckComponent } from './password-strength-checker/password-strength-checker.component';
import { PasswordFieldComponent } from './password-field/password-field.component';
import { BluiAuthErrorDialogComponent } from './error-dialog/error-dialog.component';
import { BluiPasswordStrengthCheckerComponent } from './password-strength-checker/blui-password-strength-checker.component';

@NgModule({
    declarations: [
        EmailFieldComponent,
        LoadingOverlayComponent,
        PasswordFieldComponent,
        PasswordStrengthCheckComponent,
        BluiAuthErrorDialogComponent,
        BluiPasswordStrengthCheckerComponent,
    ],
    entryComponents: [BluiAuthErrorDialogComponent],
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
        BluiAuthErrorDialogComponent,
        BluiPasswordStrengthCheckerComponent,
    ],
})
export class BluiCommonComponentsModule {}
