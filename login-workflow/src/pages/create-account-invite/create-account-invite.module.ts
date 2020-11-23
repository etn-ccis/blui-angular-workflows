import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {EmptyStateModule} from '@pxblue/angular-components';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {CommonModule} from '@angular/common';
import {PxbCreateAccountInviteComponent} from './create-account-invite.component';
import {MatDialogModule} from '@angular/material/dialog';
import {PxbCreateAccountInviteDialogComponent} from './dialog/create-account-invite-error-dialog.component';
import {PxbCreateAccountStepsModule} from "./steps/steps.module";
import {PxbCommonComponentsModule} from "../../components/auth-common.module";

@NgModule({
    declarations: [
        PxbCreateAccountInviteComponent,
        PxbCreateAccountInviteDialogComponent,
    ],
    imports: [
        BrowserModule,
        CommonModule,
        MatProgressSpinnerModule,
        MatButtonModule,
        RouterModule,
        MatIconModule,
        MatDividerModule,
        EmptyStateModule,
        MatDialogModule,
        PxbCreateAccountStepsModule,
        PxbCommonComponentsModule,
    ],
    entryComponents: [
        PxbCreateAccountInviteDialogComponent,
    ],
    exports: [
        PxbCreateAccountInviteComponent,
        PxbCreateAccountInviteDialogComponent,
        PxbCreateAccountStepsModule,
    ],
})
export class PxbCreateAccountInviteModule {}
