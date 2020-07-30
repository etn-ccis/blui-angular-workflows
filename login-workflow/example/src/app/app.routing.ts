import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authSubRoutes, PxbAuthGuard } from '@pxblue/angular-auth-workflow';
import { HomeComponent } from './pages/home/home.component';
import { AuthComponent } from './pages/auth/auth.component';

export const HOME_ROUTE = 'home';
export const AUTH_ROUTE = 'auth';

const routes: Routes = [
    { path: AUTH_ROUTE, component: AuthComponent, children: authSubRoutes },
    { path: '', redirectTo: AUTH_ROUTE, pathMatch: 'full' },
    {
        path: '',
        canActivate: [PxbAuthGuard],
        children: [{ path: HOME_ROUTE, component: HomeComponent }],
    },
];

// configures NgModule imports and exports
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
