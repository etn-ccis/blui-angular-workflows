import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BluiLoginComponent } from './pages/login/login.component';
import { BluiForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { BluiResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { BluiCreateAccountComponent } from './pages/create-account/create-account.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { BluiAuthComponent } from './auth/auth.component';
import { RouterModule } from '@angular/router';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { EmptyStateModule, SpacerModule } from '@brightlayer-ui/angular-components';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { BluiContactSupportComponent } from './pages/contact-support/contact-support.component';
import { BluiChangePasswordComponent } from './pages/change-password/change-password.component';
import { MatDialogModule } from '@angular/material/dialog';
import { BluiChangePasswordDialogComponent } from './pages/change-password/dialog/change-password-dialog.component';
import { BluiCreateAccountInviteModule } from './pages/create-account-invite/create-account-invite.module';
import { BluiCommonComponentsModule } from './components/auth-common.module';
import { BluiCreateAccountModule } from './pages/create-account/create-account.module';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
    declarations: [
        BluiLoginComponent,
        BluiForgotPasswordComponent,
        BluiResetPasswordComponent,
        BluiAuthComponent,
        BluiContactSupportComponent,
        BluiChangePasswordComponent,
        BluiChangePasswordDialogComponent,
    ],
    imports: [
        BrowserModule,
        CommonModule,
        MatProgressSpinnerModule,
        SpacerModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
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
        BluiCreateAccountModule,
        BluiCreateAccountInviteModule,
        BluiCommonComponentsModule,
    ],
    entryComponents: [BluiChangePasswordDialogComponent],
    exports: [
        BluiAuthComponent,
        BluiLoginComponent,
        BluiForgotPasswordComponent,
        BluiCreateAccountComponent,
        BluiResetPasswordComponent,
        BluiContactSupportComponent,
        BluiChangePasswordComponent,
        BluiCreateAccountModule,
        BluiCreateAccountInviteModule,
    ],
})
export class BluiAuthModule {}
