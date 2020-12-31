import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { EmptyStateModule, MobileStepperModule } from '@pxblue/angular-components';

import { PxbCreateAccountComponent } from './create-account.component';
import { PxbCreateAccountStepsModule } from './steps/steps.module';
import { PxbCommonComponentsModule } from '../../components/auth-common.module';

@NgModule({
    declarations: [PxbCreateAccountComponent],
    imports: [
        BrowserModule,
        CommonModule,
        MatProgressSpinnerModule,
        MatButtonModule,
        RouterModule,
        MatIconModule,
        MatDividerModule,
        MobileStepperModule,
        EmptyStateModule,
        MatDialogModule,
        PxbCreateAccountStepsModule,
        PxbCommonComponentsModule,
    ],
    exports: [PxbCreateAccountComponent, PxbCreateAccountStepsModule],
})
export class PxbCreateAccountModule {}
