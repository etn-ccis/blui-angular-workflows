import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { getAuthSubRoutes, PxbAuthGuard, AUTH_ROUTES } from '@pxblue/angular-auth-workflow';
import { HomeComponent } from './pages/home/home.component';
import { AuthComponent } from './pages/auth/auth.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { PreAuthComponent } from './pages/pre-auth/pre-auth.component';

// The default workflow routes can be overwritten if needed.
// This feature only works if ivy is enabled.
AUTH_ROUTES.AUTH_WORKFLOW = 'auth';
AUTH_ROUTES.CONTACT_SUPPORT = 'assistance';
AUTH_ROUTES.ON_AUTHENTICATED = '';

const authWorkflowRoutes = getAuthSubRoutes();
const routes: Routes = [
    { path: AUTH_ROUTES.AUTH_WORKFLOW, component: AuthComponent, children: authWorkflowRoutes },
    {
        path: '',
        canActivate: [PxbAuthGuard],
        children: [
            { path: '', component: HomeComponent },
            { path: 'dashboard', component: DashboardComponent },
        ],
    },
    { path: 'pre-auth', component: PreAuthComponent, pathMatch: 'full' },
];

// configures NgModule imports and exports
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
