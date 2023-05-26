import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BluiLoginComponent } from './pages/login/login.component';
import { BluiForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { BluiResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { BluiCreateAccountComponent } from './pages/create-account/create-account.component';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { BluiAuthComponent } from './auth/auth.component';
import { RouterModule } from '@angular/router';
import { MatLegacyCheckboxModule as MatCheckboxModule } from '@angular/material/legacy-checkbox';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { EmptyStateModule, SpacerModule } from '@brightlayer-ui/angular-components';
import { MatLegacyProgressSpinnerModule as MatProgressSpinnerModule } from '@angular/material/legacy-progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatLegacyListModule as MatListModule } from '@angular/material/legacy-list';
import { CommonModule } from '@angular/common';
import { BluiContactSupportComponent } from './pages/contact-support/contact-support.component';
import { BluiChangePasswordComponent } from './pages/change-password/change-password.component';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { BluiChangePasswordDialogComponent } from './pages/change-password/dialog/change-password-dialog.component';
import { BluiCreateAccountInviteModule } from './pages/create-account-invite/create-account-invite.module';
import { BluiCommonComponentsModule } from './components/auth-common.module';
import { BluiCreateAccountModule } from './pages/create-account/create-account.module';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';

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
