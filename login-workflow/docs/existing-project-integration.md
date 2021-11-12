# Integrating Into an Existing Project

To start integrating this package into an existing application, you must first have an application. We recommend using the [Brightlayer UI CLI](https://www.npmjs.com/package/@brightlayer-ui/cli) to initialize your project. 

#### Installation and Setup

Once you have a project, you can install this package via:
```shell
npm install @brightlayer-ui/angular-auth-workflow
// or
yarn add @brightlayer-ui/angular-auth-workflow
```

This package also has a number of peer dependency requirements that you will also need to install in your project. To install the latest version of all of these peer dependencies, run the following command in your project root:
```
npm install @brightlayer-ui/colors @brightlayer-ui/angular-components @angular/cdk @angular/material 
// or
yarn add @brightlayer-ui/colors @brightlayer-ui/angular-components @angular/cdk @angular/material
```

This Auth Workflow is built using Brightlayer UIs and Angular Material components; if your project is not already using Angular Material, please refer to our setup guide found [here](https://brightlayer-ui.github.io/development/frameworks-web/angular). 


#### Add Module

Import the `BluiAuthModule` into your `app.module.ts`.

```
import { BluiAuthModule } from '@brightlayer-ui/angular-auth-workflow';

imports: [
    BluiAuthModule
]
```

After the `BluiAuthModule` is added to the project, create an `AuthComponent` which renders the `<Blui-auth>` component and customize it according to your needs.

For customization info, check out the [API]() documentation.


#### Configure Routing
In your `app.routing.ts` config, add the auth-specific routes. `authSubRoutes` is a `Route[]` which contains all necessary route config.

The configuration below has the base URL redirect to the login screen. 
All routes that require authentication can be protected using the `BluiAuthGuard`.  This guard will prevent routes from being accessed from unauthenticated users.  

> By default, the `BluiAuthGuard` will redirect an unauthenticated user to the `AUTH_ROUTES.AUTH_WORKFLOW` route. If you would like to redirect the users to a different screen, the destination url can be configured in the `BluiAuthConfig` service with the `authGuardRedirectRoute` property.

In the example below, the `/home` route can only be accessed if a user is logged in.

```
import { getAuthSubRoutes, BluiAuthGuard, AUTH_ROUTES } from '@brightlayer-ui/angular-auth-workflow';
import { HomeComponent } from './pages/home/home.component';
import { AuthComponent } from './pages/auth/auth.component';

const authWorkflowRoutes = getAuthSubRoutes();
const routes: Routes = [
    { path: '', redirectTo: AUTH_ROUTES.AUTH_WORKFLOW, pathMatch: 'full' },
    { path: AUTH_ROUTES.AUTH_WORKFLOW, component: AuthComponent, children: authWorkflowRoutes },
    {
        path: '',
        canActivate: [BluiAuthGuard],
        children: [
            { path: 'home', component: HomeComponent }
        ],
    },
];
```

> If your project requires a custom pre-authentication/welcome screen, this can be supported by updating the root URL to redirect to your custom page instead of the `AUTH_ROUTES.AUTH_WORKFLOW` routes. 



The following is the list of default routes found in `getAuthSubRoutes()`.  

| Screen              | Description                                            | Default URL                       | 
| ------------------- | ------------------------------------------------------ | --------------------------------- | 
| Login               | the login screen                                       | `'/auth/login'`                   |
| Forgot Password     | the forgot password screen                             | `'/auth/forgot-password'`         | 
| Reset Password      | the reset password screen                              | `'/auth/reset-password'`          |
| Invite Registration | the first screen of the invite-based registration flow | `'/auth/register/invite'`         | 
| Self Registration   | the first screen of the self-registration flow         | `'/auth/register/create-account'` |
| Support             | the contact/support screen                             | `'/auth/support'`                 |

Any `@brightlayer-ui/angular-auth-workflow` route can be overwritten by editing the `AUTH_ROUTES` object. 

#### Provide API Services

There are two services that the `@brightlayer-ui/angular-auth-workflow` uses when it has to perform external registration or authentication actions.
The `BluiAuthUIService` and `BluiRegisterUIService` will need to be provided and implemented to perform various actions.

```
// app.module.ts
import { BluiAuthUIService, BluiRegisterUIService } from '@brightlayer-ui/angular-auth-workflow';
import { AuthUIService } from 'services/auth-ui.service';
import { RegisterUIService } from 'services/register-ui.service';

providers: [
    ...
    {
        provide: BluiAuthUIService,
        useClass: AuthUIService,
    },
    {
        provide: BluiRegisterUIService,
        useClass: RegisterUIService,
    },
]
```
