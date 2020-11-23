import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { PxbCommonComponentsModule } from '../../../components/auth-common.module';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { PxbCreateAccountEulaComponent } from './eula/eula.component';
import { PxbCreateAccountCreatePasswordComponent } from './create-password/create-password.component';
import { PxbCreateAccountAccountDetailsComponent } from './account-details/account-details.component';
import { PxbAccountCreatedComponent } from './account-created/account-created.component';
import { EmptyStateModule } from '@pxblue/angular-components';

@NgModule({
    declarations: [
        PxbCreateAccountEulaComponent,
        PxbCreateAccountCreatePasswordComponent,
        PxbCreateAccountAccountDetailsComponent,
        PxbAccountCreatedComponent,
    ],
    imports: [
        BrowserModule,
        CommonModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        EmptyStateModule,
        MatDividerModule,
        ReactiveFormsModule,
        MatIconModule,
        MatCheckboxModule,
        PxbCommonComponentsModule,
    ],
    exports: [
        PxbCreateAccountEulaComponent,
        PxbCreateAccountCreatePasswordComponent,
        PxbCreateAccountAccountDetailsComponent,
        PxbAccountCreatedComponent,
    ],
})
export class PxbCreateAccountStepsModule {}
