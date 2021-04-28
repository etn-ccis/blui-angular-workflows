import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { EmptyStateModule } from '@pxblue/angular-components';

import { PxbCommonComponentsModule } from '../../../components/auth-common.module';
import { PxbAccountCreatedComponent } from './account-created/account-created.component';
import { PxbAccountDetailsComponent } from './account-details/account-details.component';
import { PxbCreatePasswordComponent } from './create-password/create-password.component';
import { PxbEulaComponent } from './eula/eula.component';
import { PxbProvideEmailComponent } from './provide-email/provide-email.component';
import { PxbVerifyEmailComponent } from './verify-email/verify-email.component';
import { PxbExistingAccountComponent } from './existing-account/existing-account.component';

@NgModule({
    declarations: [
        PxbAccountCreatedComponent,
        PxbAccountDetailsComponent,
        PxbCreatePasswordComponent,
        PxbEulaComponent,
        PxbProvideEmailComponent,
        PxbVerifyEmailComponent,
        PxbExistingAccountComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        CommonModule,
        EmptyStateModule,
        FormsModule,
        MatButtonModule,
        MatCheckboxModule,
        MatDividerModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        PxbCommonComponentsModule,
        ReactiveFormsModule,
    ],
    exports: [
        PxbAccountCreatedComponent,
        PxbAccountDetailsComponent,
        PxbCreatePasswordComponent,
        PxbEulaComponent,
        PxbProvideEmailComponent,
        PxbVerifyEmailComponent,
        PxbExistingAccountComponent,
    ],
})
export class PxbCreateAccountStepsModule {}
