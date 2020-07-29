import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authSubRoutes } from '@pxblue/angular-auth-workflow';
import { HomeComponent } from './home/home.component';
import { AuthComponent } from './auth/auth.component';

const routes: Routes = [
    { path: 'auth', component: AuthComponent, children: authSubRoutes },
    {
        path: '',
        //   canActivate: [PxbAuthGuard],
        children: [
            { path: '', component: AuthComponent },
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
