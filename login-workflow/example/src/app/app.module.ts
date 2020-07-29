import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './app.routing';
import { PxbAuthModule, PxbLoginService } from '@pxblue/angular-auth-workflow';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthComponent } from './auth/auth.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CustomLoginService } from './services/login.service';

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
    ],
    providers: [
        {
            provide: PxbLoginService,
            useClass: CustomLoginService,
        },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
