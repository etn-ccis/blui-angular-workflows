import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PxbLoginComponent } from '@pxblue/angular-auth-workflow';
import { PxbForgotPasswordComponent } from '@pxblue/angular-auth-workflow';
import { HomeComponent } from './home/home.component';
import { PxbResetPasswordComponent } from '@pxblue/angular-auth-workflow';
import { PxbAuthGuard } from '@pxblue/angular-auth-workflow';
import {PxbCreateAccountComponent} from '@pxblue/angular-auth-workflow'; // CLI imports router

const routes: Routes = [
    { path: 'login', component: PxbLoginComponent },
    { path: 'reset-password', component:  PxbResetPasswordComponent },
    { path: 'forgot-password', component:  PxbForgotPasswordComponent },
    { path: 'create-account', component:  PxbCreateAccountComponent },
    {
        path: '',
        canActivate: [PxbAuthGuard],
        children: [
            { path: '', component: PxbLoginComponent },
            { path: 'home', component: HomeComponent },
        ],
    },
];

// configures NgModule imports and exports
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
