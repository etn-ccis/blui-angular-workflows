import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {CommonModule} from '@angular/common';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatListModule} from "@angular/material/list";

import {LoadingOverlayComponent} from "./loading-overlay/loading-overlay.component";
import {PasswordStrengthCheckComponent} from "./password-strength-checker/password-strength-checker.component";
import {DotStepperComponent} from "./dot-stepper/dot-stepper.component";
import {PxbPasswordStrengthCheckerComponent} from "./password-strength-checker/pxb-password-strength-checker.component";

@NgModule({
    declarations: [
        DotStepperComponent,
        LoadingOverlayComponent,
        PasswordStrengthCheckComponent,
        PxbPasswordStrengthCheckerComponent,
    ],
    imports: [
        BrowserModule,
        CommonModule,
        MatIconModule,
        MatDividerModule,
        MatProgressSpinnerModule,
        MatListModule,
    ],
    exports: [
        DotStepperComponent,
        LoadingOverlayComponent,
        PasswordStrengthCheckComponent,
        PxbPasswordStrengthCheckerComponent,
    ],
})
export class PxbCommonComponentsModule {}
