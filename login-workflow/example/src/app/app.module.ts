import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { AppRoutingModule } from './app.routing';
import {
    BluiAuthModule,
    BluiAuthUIService,
    BluiRegisterUIService,
    BluiLoginErrorDialogService,
} from '@brightlayer-ui/angular-auth-workflow';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthComponent } from './pages/auth/auth.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthUIService } from './services/auth-ui.service';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginErrorDialogComponent } from './dialog/login-error-dialog.component';
import { RegisterUIService } from './services/register-ui.service';
import { LoginErrorDialogService } from './dialog/login-error-dialog.service';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';
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
        BluiAuthModule,
        ReactiveFormsModule,
    ],
    providers: [
        {
            provide: 'APP_NAME',
            useValue: 'BLUI_AUTH_DEMO_APP',
        },
        {
            provide: BluiAuthUIService, // AuthUI Service you will overwrite (dont change this name)
            useClass: AuthUIService, // Your custom implementation.
        },
        {
            provide: BluiRegisterUIService, // RegistrationUI Service you will overwrite (dont change this name)
            useClass: RegisterUIService, // Your custom implementation.
        },
        // Custom error handling for Login failures
        /* {
            provide: BluiLoginErrorDialogService,
            useClass: LoginErrorDialogService,
        }, */
    ],
    entryComponents: [LoginErrorDialogComponent],
    bootstrap: [AppComponent],
})
export class AppModule {}
