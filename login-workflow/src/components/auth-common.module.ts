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
import { DotStepperComponent } from './dot-stepper/dot-stepper.component';
import { PxbPasswordStrengthCheckerComponent } from './password-strength-checker/pxb-password-strength-checker.component';
import { PxbAuthErrorDialogComponent } from './error-dialog/error-dialog.component';

@NgModule({
    declarations: [
        DotStepperComponent,
        LoadingOverlayComponent,
        PasswordStrengthCheckComponent,
        PxbAuthErrorDialogComponent,
        PxbPasswordStrengthCheckerComponent,
    ],
    entryComponents: [PxbAuthErrorDialogComponent],
    imports: [
        BrowserModule,
        CommonModule,
        MatIconModule,
        MatDividerModule,
        MatProgressSpinnerModule,
        MatButtonModule,
        MatListModule,
    ],
    exports: [
        DotStepperComponent,
        LoadingOverlayComponent,
        PasswordStrengthCheckComponent,
        PxbAuthErrorDialogComponent,
        PxbPasswordStrengthCheckerComponent,
    ],
})
export class PxbCommonComponentsModule {}
