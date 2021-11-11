import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { EmptyStateModule, MobileStepperModule } from '@brightlayer-ui/angular-components';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { CommonModule } from '@angular/common';
import { BluiCreateAccountInviteComponent } from './create-account-invite.component';
import { MatDialogModule } from '@angular/material/dialog';
import { BluiCreateAccountStepsModule } from '../create-account/steps/steps.module';
import { BluiCommonComponentsModule } from '../../components/auth-common.module';

@NgModule({
    declarations: [BluiCreateAccountInviteComponent],
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
        BluiCreateAccountStepsModule,
        BluiCommonComponentsModule,
    ],
    exports: [BluiCreateAccountInviteComponent, BluiCreateAccountStepsModule],
})
export class BluiCreateAccountInviteModule {}
