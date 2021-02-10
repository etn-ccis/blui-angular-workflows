import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { getAuthSubRoutes, PxbAuthGuard, AUTH_ROUTES } from '@pxblue/angular-auth-workflow';
import { HomeComponent } from './pages/home/home.component';
import { AuthComponent } from './pages/auth/auth.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

// The default workflow routes can be overwritten if needed.
// This feature only works if ivy is enabled.
AUTH_ROUTES.AUTH_WORKFLOW = 'auth';
AUTH_ROUTES.CONTACT_SUPPORT = 'assistance';

const authWorkflowRoutes = getAuthSubRoutes();

// This is an example of how to remove access to one of the workflow's built-in pages.
// authWorkflowRoutes.delete(AUTH_ROUTES.CONTACT_SUPPORT);

const routes: Routes = [
    { path: '', redirectTo: AUTH_ROUTES.AUTH_WORKFLOW, pathMatch: 'full' },
    { path: AUTH_ROUTES.AUTH_WORKFLOW, component: AuthComponent, children: Array.from(authWorkflowRoutes.values()) },
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
