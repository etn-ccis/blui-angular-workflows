import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { AppRoutingModule, AUTH_ROUTE, HOME_ROUTE } from './app.routing';
import { PxbAuthModule, PxbAuthApiService, PXB_AUTH_CONFIG } from '@pxblue/angular-auth-workflow';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthComponent } from './pages/auth/auth.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthService } from './services/auth.service';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';


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
            provide: PxbAuthApiService,
            useClass: AuthService,
        },
        {
            provide: PXB_AUTH_CONFIG,
            useValue: {
                homeRoute: HOME_ROUTE,
                authRoute: AUTH_ROUTE,
            },
        },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
