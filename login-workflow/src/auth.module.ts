import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { PxbLoginComponent } from './pages/login/login.component';
import { PxbForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { PxbResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { PxbCreateAccountComponent } from './pages/create-account/create-account.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { PxbAuthComponent } from './auth/auth.component';
import { RouterModule } from '@angular/router';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { EmptyStateModule, SpacerModule } from '@pxblue/angular-components';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { PxbContactSupportComponent } from './pages/contact-support/contact-support.component';
import { PxbChangePasswordComponent } from './pages/change-password/change-password.component';
import { MatDialogModule } from '@angular/material/dialog';
import { PxbChangePasswordDialogComponent } from './pages/change-password/dialog/change-password-dialog.component';
import { PxbCreateAccountInviteModule } from './pages/create-account-invite/create-account-invite.module';
import { PxbCommonComponentsModule } from './components/auth-common.module';
import { PxbCreateAccountModule } from './pages/create-account/create-account.module';

@NgModule({
    declarations: [
        PxbLoginComponent,
        PxbForgotPasswordComponent,
        PxbResetPasswordComponent,
        PxbAuthComponent,
        PxbContactSupportComponent,
        PxbChangePasswordComponent,
        PxbChangePasswordDialogComponent,
    ],
    imports: [
        BrowserModule,
        CommonModule,
        MatProgressSpinnerModule,
        SpacerModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatCardModule,
        ReactiveFormsModule,
        FormsModule,
        RouterModule,
        MatCheckboxModule,
        MatIconModule,
        MatDividerModule,
        EmptyStateModule,
        MatListModule,
        MatDialogModule,
        PxbCreateAccountModule,
        PxbCreateAccountInviteModule,
        PxbCommonComponentsModule,
    ],
    entryComponents: [PxbChangePasswordDialogComponent],
    exports: [
        PxbAuthComponent,
        PxbLoginComponent,
        PxbForgotPasswordComponent,
        PxbCreateAccountComponent,
        PxbResetPasswordComponent,
        PxbContactSupportComponent,
        PxbChangePasswordComponent,
        PxbCreateAccountModule,
        PxbCreateAccountInviteModule,
    ],
})
export class PxbAuthModule {}
