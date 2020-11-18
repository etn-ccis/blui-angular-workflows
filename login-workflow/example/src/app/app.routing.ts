import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authSubRoutes, PxbAuthGuard, AUTH_ROUTE } from '@pxblue/angular-auth-workflow';
import { HomeComponent } from './pages/home/home.component';
import { AuthComponent } from './pages/auth/auth.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

const routes: Routes = [
    { path: '', redirectTo: AUTH_ROUTE, pathMatch: 'full' },
    { path: AUTH_ROUTE, component: AuthComponent, children: authSubRoutes },
    {
        path: '',
        canActivate: [PxbAuthGuard],
        children: [
            { path: 'home', component: HomeComponent },
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
