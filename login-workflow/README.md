# Angular Auth Workflow 
![npm (scoped)](https://img.shields.io/npm/v/@pxblue/angular-auth-workflow)

The Angular Auth Workflow package provides a consistent authentication and registration experience across Eaton web applications using Angular. 

This includes pre-built implementations of the screens for Login, Forgot Password, Contact Information, Self-Registration, Registration By Invitation, and a dialog for Change Password.

This documentation explains the steps required to integrate this auth workflow into your application.
At a high level, the integration steps are: 

1. Add `@pxblue/angular-auth-workflow` as a dependency
2. Update app Routing config
3. Update workflow's `PxbAuthConfig`.
3. Update workflow's `securityState`.
4. Provide your own `PxbAuthUIService` and `PxbRegisterUIService`.


![Login iOS](https://raw.githubusercontent.com/pxblue/react-workflows/master/login-workflow/media/login.png) ![Home iOS](https://raw.githubusercontent.com/pxblue/react-workflows/master/login-workflow/media/home.png) ![Password iOS](https://raw.githubusercontent.com/pxblue/react-workflows/master/login-workflow/media/password.png)


# Installation
To install the latest version of this package, run:
```shell
npm install --save @pxblue/angular-auth-workflow
// or
yarn add @pxblue/angular-auth-workflow
```

# Integration
You have two options for using this package in your application. You can manually integrate the package into an existing project, or you can start a project using the `/example` project provided in the package. 

To integrate the package into an existing project, read our [Existing Project Integration](https://github.com/pxblue/angular-workflows/tree/master/login-workflow/docs/existing-project-integration.md) instructions. Even if you are starting from scratch, it may be useful for you to refer to the example project while getting started.

To use the example project as a starting point, read our [Sample Project Integration](https://github.com/pxblue/angular-workflows/tree/master/login-workflow/docs/sample-project-integration.md) instructions.


// TODO: Move this to the existing project integration docs
# Routing
In your `app.routing.ts` config, add the auth-specific routes. `authSubRoutes` is a `Route[]` which contains all necessary route config.

The configuration below has the base URL redirect to the login screen. 
All routes that require authentication can be protected using the `PxbAuthGuard`.  This guard will read the state from the `PxbAuthSecurityService` and will block navigation then redirect if a user is not authenticated.  

In the example below, the `/home` and `/dashboard` routes can only be accessed if a user is logged in.

```
import { authSubRoutes, PxbAuthGuard, AUTH_ROUTE } from '@pxblue/angular-auth-workflow';
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
```

The following is the list of default routes found in `authSubRoutes`: 

| Screen              | Description                                            | Default URL                       | 
| ------------------- | ------------------------------------------------------ | --------------------------------- | 
| Login               | the login screen                                       | `'/auth/login'`                   |
| Forgot Password     | the forgot password screen                             | `'/auth/forgot-password'`         | 
| Reset Password      | the reset password screen                              | `'/auth/reset-password'`          |
| Invite Registration | the first screen of the invite-based registration flow | `'/auth/register/invite'`         | 
| Self Registration   | the first screen of the self-registration flow         | `'/auth/register/create-account'` |
| Support             | the contact/support screen                             | `'/auth/support'`                 |


#### Testing Deep Links

- Open the sample URL in your browser `http://localhost:4200/auth/create-account-invite?code=DEADBEEF`


# Usage (Security State)

After setup, you are now able to access various security actions and state from within your application.  

`PxbAuthSecurityService` is a service used to store authentication state.  Pages with the auth workflow will look to this service for information about a current user and their authentication state. 

Below is an example of how to inject this service into an component. 


```ts
import { PxbAuthSecurityService, AUTH_ROUTE } from '@pxblue/angular-auth-workflow';

constructor(private readonly _pxbSecurityService: PxbAuthSecurityService) {}

logout(): void {
   this._pxbSecurityService.updateSecurityState({ isAuthenticatedUser: false });
   void this._router.navigate([AUTH_ROUTE]);
}
```

More information about `@pxblue/angular-auth-workflow's` exported objects can found in the API documentation further below.

# API

This document outlines the various exports and configuration options for the `@pxblue/angular-auth-shared` package.

## Context Providers

### PxbAuthConfig

`PxbAuthConfig` is a service used to configuration how the `@pxblue/angular-auth-workflow` behaves. UI configuration properties are also passed in.

#### Usage

```tsx
import { PxbAuthConfig } from '@pxblue/angular-auth-workflow';

constructor(pxbAuthConfig: PxbAuthConfig) {
    pxbAuthConfig.projectImage = 'assets/images/eaton_stacked_logo.png';
    pxbAuthConfig.backgroundImage = 'assets/images/background.svg';
    pxbAuthConfig.allowDebugMode = true;
    pxbAuthConfig.showSelfRegistration = false;
}
```

#### Available Props

-   **allowDebugMode** (optional): _`boolean`_
    -   When true, presents a debug button on the login screen to allow access to deep link-based screens/flows
    -   Default: false
-   **contactEmail** (optional): _`string`_
    -   Contact email address to be shown on the support screen
    -   Default: provides a fake email address
-   **contactPhone** (optional): _`string`_
    -   Contact phone number to be shown on the support screen (human-readable for display only).
    -   Default: provides a fake phone number
-   **htmlEula** (optional): _`boolean`_
    -   Set to true if your EULA needs to be rendered as HTML
    -   Default: false
-   **passwordRequirements** (optional): _`PasswordRequirement[]`_
    -   An array of `PasswordRequirement`s that must be satisfied when creating or changing a password.
    -   Default: Passwords must contain a number, uppercase letter, lowercase letter, special character, and be between 8 and 16 characters in length
-   **projectImage** (optional): _`number | string`_
    -   Project image shown on splash screen and login screen.
    -   Dimensions of the image should be 534w x 152h with a transparent background. Differently sized images may not render properly on all devices.
    -   Default: Provides an example project image.
-   **showSelfRegistration**: _`boolean`_
    -   When true, shows the Create Account button to allow for self registration.
    -   Default: true

## PasswordRequirement

Definition for a security/complexity requirement for application passwords.

### Type Declaration

-   **description**: _`string`_
    -   The text description of the requirement (e.g., 'contains an uppercase letter')
-   **regex**: _`RegExp`_
    -   A regular expression the defines the complexity requirement (e.g., `/[A-Z]+/`)
    
### PxbAuthSecurityService

`PxbAuthSecurityService` provides a single source of state for the state of user authentication. It is not meant to authenticate the user or hold credential information. Its purpose is to control access to authenticated or non-authenticated sections of the application (as well as change password for a currently authenticated user).

#### Usage

```ts
import { PxbAuthSecurityService, AUTH_ROUTE } from '@pxblue/angular-auth-workflow';

constructor(private readonly _pxbSecurityService: PxbAuthSecurityService) {}

logout(): void {
   this._pxbSecurityService.updateSecurityState({ isAuthenticatedUser: false });
   void this._router.navigate([AUTH_ROUTE]);
}
```

## Methods

-   **getSecurityState**: _`SecurityContext`_
    -   Returns current security state
-   **updateSecurityState(newState: Partial<SecurityContext>)**: _`void`_
    -   Accepts any new state prop and applies to the the current state.
-   **securityStateChanges**: _`Observable<SecurityContext>`_
    -   An observable that emits when the security state changes
-   **onUserAuthenticated**: _`void`_
    -   Called when User authenticates; called either in `PxbAuthUIService's` `initiateSecurity` call or after `login` button is pressed and user logs in.
-   **onUserNotAuthenticated**: _`Observable<SecurityContext>`_
    -   Should be called when the user is no longer authenticated; updates state accordingly.

## PxbAuthUIService

Authentication Actions to be performed based on the user's UI actions. The application will create appropriate actions (often api calls, local network storage, credential updates, etc.) and update the global security state based on the actionable needs of the user. A mock PxbAuthUIService implementation is provided in the examples folder for getting started with during development.

### Type Declaration

-   **changePassword**: _`(oldPassword: string, newPassword: string): Promise<void>`_

    -   An authenticated user wants to change their password. The application should try to change the user's password. Upon completion, the user will be logged out of the application. Upon cancellation, the user will be taken back to the application's home screen.

    -   **Parameters**:

        -   **oldPassword**: _`string`_
            -   The user's current password as entered into the UI.
        -   **newPassword**: _`string`_
            -   The user's new password as entered into the UI.

    -   **Returns**: _`Promise<void>`_
        -   Resolve if successful, otherwise reject with an error message.

-   **forgotPassword**: _`(email: string): Promise<void>`_

    -   The user has forgotten their password and wants help. The application generally should call an API which will then send a password reset link to the user's email.

    -   **Parameters**:

        -   **email**: _`string`_
            -   Email address the user uses to log in to the application.

    -   **Returns**: _`Promise<void>`_
        -   Resolve if email is sent successfully, reject otherwise.

-   **initiateSecurity**: _`() => Promise<void>`_

    -   Initialize the application security state. This will involve reading any local storage, validating existing credentials (token expiration, for example). At the end of validation, the SecurityContextActions should be called with either: onUserAuthenticated (which will present the application), or onUserNotAuthenticated (which will present the Auth UI).

        > Note: Until this method returns, the applications Splash screen will be presented.

    -   **Returns**: _`Promise<void>`_
        -   Should always resolve, never throw.

-   **login**: _`(email: string, password: string, rememberMe: boolean): Promise<void>`_

    -   The user wants to log into the application. Perform a login with the user's credentials. The application should provide the user's email and password to the authentication server. In the case of valid credentials, the applications code should store the returned data (such as token, user information, etc.). Then the onUserAuthenticated function should be called on the SecurityContextActions object.

    -   **Parameters**:

        -   **email**: _`string`_
            -   Email address the user entered into the UI.
        -   **password**: _`string`_
            -   Password the user entered into the UI.
        -   **rememberMe**: _`boolean`_
            -   Indicates whether the user's email should be remembered on success.

    -   **Returns**: _`Promise<void>`_
        -   Resolve if code is credentials are valid, otherwise reject.

-   **setPassword**: _`(password: string) => Promise<void>`_

    -   A user who has previously used "forgotPassword" now has a valid password reset link and has entered a new password. The application should take the user's newly entered password and then reset the user's password.

        > Note: Upon success, the user will be taken to the Login screen

    -   **Parameters**:

        -   **password**: _`string`_
            -   New Password the user entered into the UI

    -   **Returns**: _`Promise<void>`_
        -   Resolve if successful, otherwise reject with an error message.

-   **verifyResetCode**: _`() => Promise<void>`_

    -   The user has tapped on an email with a password reset link, which they received after requesting help for forgetting their password. This API call validates the reset link is legitimate and the app should allow a user to enter a new password. 

    -   **Returns**: _`Promise<void>`_
        -   Resolve if reset link is valid, otherwise reject.

## PxbRegisterUIService

Registration Actions to be performed based on the user's actions. The application will create appropriate actions (often API calls, local network storage, credential updates, etc.) based on the actionable needs of the user. A mock `PxbRegisterUIService` implementation is provided in the examples to start with during development.

### Type Declaration

-   **completeRegistration**: _`(firstName: string, lastName: string, phoneNumber: string, password: string, validationCode?: string, email?: string: Promise<void>`_

    -   The user has been invited to register and has entered the necessary account and password information. The application should now complete the registration process given the user's data.

        > Note: Upon resolution, the user will be brought back to the Login screen.

    -   **Parameters**:
        -   **firstName**: _`string`_
            -   User's first name.
        -   **lastName**: _`string`_
            -   User's last name.
        -   **phoneNumber**: _`phoneNumber`_
            -   User-provided phoneNumber; may be undefined.
        -   **password**: (optional) _`string`_
            -   User's requested account password.
        -   **validationCode**: (optional) _`string`_
            -   Code used to validate if a user's account registration link was valid.
        -   **email**: (optional) _`string`_
            -   User-provided email when creating a new account via `/auth/create-account`.
    -   **Returns**: _`Promise<void>`_
        -   Resolve when account creation succeeds, otherwise reject with an error message.

-   **loadEULA**: _`(): Promise<string>)`_

    -   The user wants to complete an action but must first accept the EULA. The application should retrieve an application-specific EULA for the user.
    -   **Returns**: _`Promise<string>`_
        -   Resolve with EULA, otherwise reject with an error message.

-   **requestRegistrationCode**: _`(email: string): Promise<void>)`_

    -   The user entered their email address and accepted the EULA. The API should now send them an email with the validation code.

    -   **Parameters**:

        -   **email**: _`string`_
            -   The email address for the registering user.

    -   **Returns**: _`Promise<void>`_
        -   Resolve when the server has accepted the request.

-   **validateUserRegistrationRequest**: _`(code: string) => Promise<boolean>)`_

    -   The user has been sent a verification code to an email they have provided; validate the verification code has been received to continue account registration.

    -   **Parameters**:

        -   **code**: _`string`_
            -   Registration code provided from the link.

    -   **Returns**: _`Promise<void>`_
        -   Resolves when the code is valid. Reject with an error message.

# Contributors

To work on this package as a contributor, first clone down the repository:
```shell
git clone https://github.com/pxblue/angular-workflows
cd angular-workflows/login-workflow
```

You can install all necessary dependencies and run the demo project by running:
```shell
yarn start:example
```

If you make changes to the library components and want to link them to the running example project, you can run:
```shell
yarn watch
```

In a new terminal, run: 
```shell
cd example && yarn start
```
