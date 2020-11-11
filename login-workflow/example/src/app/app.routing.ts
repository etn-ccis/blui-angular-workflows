import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authSubRoutes, PxbAuthGuard } from '@pxblue/angular-auth-workflow';
import { HomeComponent } from './pages/home/home.component';
import { AuthComponent } from './pages/auth/auth.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

export const HOME_ROUTE = 'home'; // TODO: Figure out how to do route redirects - e.g. user has a pre-determined route they wanted to navigate to, but were redirected to the login screen.
export const AUTH_ROUTE = 'auth';

const routes: Routes = [
    { path: '', redirectTo: AUTH_ROUTE, pathMatch: 'full' },
    { path: AUTH_ROUTE, component: AuthComponent, children: authSubRoutes },
    {
        path: '',
        canActivate: [PxbAuthGuard],
        children: [
            { path: HOME_ROUTE, component: HomeComponent },
            { path: 'dashboard', component: DashboardComponent },
        ],
    },
];

// configures NgModule imports and exports
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
