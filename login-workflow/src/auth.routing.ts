import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PxbLoginComponent } from './pages/login/login.component';
import { PxbForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { PxbResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { PxbAuthGuard } from './guards/auth-guard';
import { PxbCreateAccountComponent } from './pages/create-account/create-account.component'; // CLI imports router

const routes: Routes = [
    { path: 'login', component: PxbLoginComponent },
    { path: 'reset-password', component: PxbResetPasswordComponent },
    { path: 'forgot-password', component: PxbForgotPasswordComponent },
    { path: 'create-account', component: PxbCreateAccountComponent },
    {
        path: '',
        canActivate: [PxbAuthGuard],
        children: [{ path: '', component: PxbLoginComponent }],
    },
];

// configures NgModule imports and exports
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class PxbAuthRoutingModule {}
