import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { EmptyStateModule, MobileStepperModule } from '@pxblue/angular-components';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { CommonModule } from '@angular/common';
import { PxbCreateAccountInviteComponent } from './create-account-invite.component';
import { MatDialogModule } from '@angular/material/dialog';
import { PxbCreateAccountStepsModule } from '../create-account/steps/steps.module';
import { PxbCommonComponentsModule } from '../../components/auth-common.module';

@NgModule({
    declarations: [PxbCreateAccountInviteComponent],
    imports: [
        BrowserModule,
        CommonModule,
        MatProgressSpinnerModule,
        MatButtonModule,
        RouterModule,
        MatIconModule,
        MatDividerModule,
        EmptyStateModule,
        MobileStepperModule,
        MatDialogModule,
        PxbCreateAccountStepsModule,
        PxbCommonComponentsModule,
    ],
    exports: [PxbCreateAccountInviteComponent, PxbCreateAccountStepsModule],
})
export class PxbCreateAccountInviteModule {}
