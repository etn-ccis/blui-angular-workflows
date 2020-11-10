import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {HomeComponent} from './pages/home/home.component';
import {AppRoutingModule} from './app.routing';
import {PxbAuthModule, PxbAuthUIService, PxbRegistrationApiService, PxbLoginErrorDialogService} from '@pxblue/angular-auth-workflow';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AuthComponent} from './pages/auth/auth.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AuthUIService} from './services/auth-ui.service';
import {RegistrationService} from './services/registration.service';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {DashboardComponent} from "./pages/dashboard/dashboard.component";
import {LoginErrorDialogComponent} from "./dialog/login-error-dialog.component";
import {LoginErrorDialogService} from "./dialog/login-error-dialog.service";

@NgModule({
    declarations: [
      AppComponent,
      HomeComponent,
      AuthComponent,
      DashboardComponent,
      LoginErrorDialogComponent
    ],
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
            provide: PxbAuthUIService,
            useClass: AuthUIService,
        },
        {
            provide: PxbRegistrationApiService,
            useClass: RegistrationService,
        },
        {
          provide: PxbLoginErrorDialogService,
          useClass: LoginErrorDialogService
        }
    ],
  entryComponents: [
    LoginErrorDialogComponent
  ],
    bootstrap: [AppComponent],
})
export class AppModule {}
