import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { AppRoutingModule } from './app.routing';
import {
    PxbAuthModule,
    PxbAuthUIService,
    PxbRegisterUIService,
    PxbLoginErrorDialogService,
} from '@pxblue/angular-auth-workflow';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthComponent } from './pages/auth/auth.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthUIService } from './services/auth-ui.service';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginErrorDialogComponent } from './dialog/login-error-dialog.component';
import { RegisterUIService } from './services/register-ui.service';
import { LoginErrorDialogService } from './dialog/login-error-dialog.service';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { PreAuthComponent } from './pages/pre-auth/pre-auth.component';

@NgModule({
    declarations: [
        AppComponent,
        PreAuthComponent,
        HomeComponent,
        AuthComponent,
        DashboardComponent,
        LoginErrorDialogComponent,
    ],
    imports: [
        AppRoutingModule,
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        MatCardModule,
        MatButtonModule,
        MatDialogModule,
        MatDividerModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatSelectModule,
        MatToolbarModule,
        PxbAuthModule,
        ReactiveFormsModule,
    ],
    providers: [
        {
            provide: 'APP_NAME',
            useValue: 'PXB_AUTH_DEMO_APP',
        },
        {
            provide: PxbAuthUIService, // AuthUI Service you will overwrite (dont change this name)
            useClass: AuthUIService, // Your custom implementation.
        },
        {
            provide: PxbRegisterUIService, // RegistrationUI Service you will overwrite (dont change this name)
            useClass: RegisterUIService, // Your custom implementation.
        },
        // Custom error handling for Login failures
        {
            provide: PxbLoginErrorDialogService,
            useClass: LoginErrorDialogService,
        },
    ],
    entryComponents: [LoginErrorDialogComponent],
    bootstrap: [AppComponent],
})
export class AppModule {}
