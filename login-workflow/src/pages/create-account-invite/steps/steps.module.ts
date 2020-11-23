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

@NgModule({
    declarations: [
        PxbCreateAccountEulaComponent,
        PxbCreateAccountCreatePasswordComponent,
        PxbCreateAccountAccountDetailsComponent,
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
    ],
})
export class PxbCreateAccountStepsModule {}
