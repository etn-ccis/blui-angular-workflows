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

import { EmptyStateModule } from '@brightlayer-ui/angular-components';

import { BluiCommonComponentsModule } from '../../../components/auth-common.module';
import { BluiAccountCreatedComponent } from './account-created/account-created.component';
import { BluiAccountDetailsComponent } from './account-details/account-details.component';
import { BluiCreatePasswordComponent } from './create-password/create-password.component';
import { BluiEulaComponent } from './eula/eula.component';
import { BluiProvideEmailComponent } from './provide-email/provide-email.component';
import { BluiVerifyEmailComponent } from './verify-email/verify-email.component';
import { BluiExistingAccountComponent } from './existing-account/existing-account.component';

@NgModule({
    declarations: [
        BluiAccountCreatedComponent,
        BluiAccountDetailsComponent,
        BluiCreatePasswordComponent,
        BluiEulaComponent,
        BluiProvideEmailComponent,
        BluiVerifyEmailComponent,
        BluiExistingAccountComponent,
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
        BluiCommonComponentsModule,
        ReactiveFormsModule,
    ],
    exports: [
        BluiAccountCreatedComponent,
        BluiAccountDetailsComponent,
        BluiCreatePasswordComponent,
        BluiEulaComponent,
        BluiProvideEmailComponent,
        BluiVerifyEmailComponent,
        BluiExistingAccountComponent,
    ],
})
export class BluiCreateAccountStepsModule {}
