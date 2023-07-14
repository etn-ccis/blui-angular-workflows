import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { EmptyStateModule, MobileStepperModule } from '@brightlayer-ui/angular-components';
import { MatLegacyProgressSpinnerModule as MatProgressSpinnerModule } from '@angular/material/legacy-progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { CommonModule } from '@angular/common';
import { BluiCreateAccountInviteComponent } from './create-account-invite.component';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
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
