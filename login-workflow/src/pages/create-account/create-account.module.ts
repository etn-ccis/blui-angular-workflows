import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { EmptyStateModule, MobileStepperModule } from '@brightlayer-ui/angular-components';

import { BluiCreateAccountComponent } from './create-account.component';
import { BluiCreateAccountStepsModule } from './steps/steps.module';
import { BluiCommonComponentsModule } from '../../components/auth-common.module';

@NgModule({
    declarations: [BluiCreateAccountComponent],
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
        BluiCreateAccountStepsModule,
        BluiCommonComponentsModule,
    ],
    exports: [BluiCreateAccountComponent, BluiCreateAccountStepsModule],
})
export class BluiCreateAccountModule {}
