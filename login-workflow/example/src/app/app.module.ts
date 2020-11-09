import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { AppRoutingModule, AUTH_ROUTE, HOME_ROUTE } from './app.routing';
import {
    PxbAuthModule,
    PxbRegistrationApiService,
    PxbAuthUIActionsService,
    PXB_AUTH_CONFIG,
} from '@pxblue/angular-auth-workflow';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthComponent } from './pages/auth/auth.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthUIService } from './services/auth-ui.service';
import { RegistrationService } from './services/registration.service';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { LocalStorageService } from './services/localStorage.service';

@NgModule({
    declarations: [AppComponent, HomeComponent, AuthComponent],
    imports: [
        BrowserModule,
        MatFormFieldModule,
        MatInputModule,
        BrowserAnimationsModule,
        MatCardModule,
        ReactiveFormsModule,
        FormsModule,
        PxbAuthModule,
        AppRoutingModule,
        MatButtonModule,
        MatDialogModule,
    ],
    providers: [
        {
            provide: 'APP_NAME',
            useValue: 'PXB_AUTH_DEMO_APP',
        },
        {
            provide: PxbAuthUIActionsService,
            useClass: AuthUIService,
        },
        {
            provide: PxbRegistrationApiService,
            useClass: RegistrationService,
        },
        {
            provide: PXB_AUTH_CONFIG,
            useValue: {
                homeRoute: HOME_ROUTE,
                authRoute: AUTH_ROUTE,
                allowDebugMode: true,
                projectImage: 'assets/images/eaton_stacked_logo.png',
            },
        },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
