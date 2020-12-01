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

To integrate the package into an existing project, read our [Existing Project Integration ](https://github.com/pxblue/angular-workflows/tree/master/login-workflow/docs/existing-project-integration.md) instructions. Even if you are starting from scratch, it may be useful for you to refer to the example project while getting started.

To use the example project as a starting point, read our [Sample Project Integration ](https://github.com/pxblue/angular-workflows/tree/master/login-workflow/docs/sample-project-integration.md) instructions.


# Routing
In your `app.routing.ts` config, add the auth-specific routes.  `authSubRoutes` is a `Route[]` which contains all necessary route config.

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

-   **verifyResetCode**: _`() => Promise<void>)`_

    -   The user has tapped on an email with a password reset link, which they received after requesting help for forgetting their password. This API call validates the reset link is legitimate and the app should allow a user to enter a new password. 

    -   **Returns**: _`Promise<void>`_
        -   Resolve if reset link is valid, otherwise reject.

## RegistrationUIActions

Registration Actions to be performed based on the user's actions. The application will create appropriate actions (often API calls, local network storage, credential updates, etc.) based on the actionable needs of the user. A mock `PxbRegisterUIService` implementation is provided in the examples to start with during development.

### Type Declaration

-   **completeRegistration**: _`(firstName: string, lastName: string, phoneNumber: string, password: string, validationCode?: string, email?: string) => Promise<void>`_

    -   The user has been invited to register and has entered the necessary account and password information. The application should now complete the registration process given the user's data.

        > Note: Upon resolution, the user will be brought back to the Login screen.

    -   **Parameters**:

        -   **userData**: _`{ accountDetails: AccountDetailInformation, password: string }`_
            -   Account details and password entered by the user.
        -   **validationCode**: _`string`_
            -   Registration code provided from the invitation email link.
        -   **validationEmail**: (optional) _`string`_
            -   Email provided from the invitation email link (optional) `?email=addr%40domain.com`.

    -   **Returns**: _`Promise<{ email: string, organizationName: string }>`_
        -   Resolve when account creation succeeds, otherwise reject with an error message.

-   **loadEULA**: _`(language: string) => Promise<string>)`_

    -   The user wants to complete an action but must first accept the EULA. The application should retrieve an application-specific EULA for the user.

    -   **Parameters**:

        -   **language**: _`string`_
            -   The i18n language the user is requesting for the EULA text.

    -   **Returns**: _`Promise<string>`_
        -   Resolve with EULA, otherwise reject with an error message.

-   **requestRegistrationCode**: _`(email: string) => Promise<void>)`_

    -   The user entered their email address and accepted the EULA. The API should now send them an email with the validation code.

    -   **Parameters**:

        -   **email**: _`string`_
            -   The email address for the registering user.

    -   **Returns**: _`Promise<void>`_
        -   Resolve when the server has accepted the request.

-   **validateUserRegistrationRequest**: _`(validationCode: string, validationEmail?: string) => Promise<boolean>)`_

    -   The user has tapped on an email link inviting them to register with the application. The application should validate the code provided by the link.

    -   **Parameters**:

        -   **validationCode**: _`string`_
            -   Registration code provided from the link.
        -   **validationEmail**: (optional) _`string`_
            -   Email provided from the invitation email link (optional) `?email=addr%40domain.com`.

    -   **Returns**: _`Promise<boolean>`_
        -   Resolves when the code is valid. True if registration is complete, False if account information is needed. If the code is not valid a rejection will occur with an error message.

## RegistrationUIState

Global state for registration-related activities and loading the EULA for newly registering users

### Type Declaration

-   **eulaTransit**: _`TransitState`_
    -   Network state for fetching a remote EULA.
-   **inviteRegistration**: _`InviteRegistrationState`_
    -   Network and returned values state for registration of anew user via invitation.

## SecurityContextActions

Actions that change the security state of the application.

### Type Declaration

-   **hideChangePassword**: _`() => void`_

    -   Close the Change Password screen. This is most often called from within the Change Password screen. If the user has successfully changed their password, then hiding Change Password will take to the Authentication User Interface. If the user cancels changing their password, hiding Change Password will take the user back to the application's main screen.

    -   **Returns**: _`void`_

-   **onUserAuthenticated**: _`(args: { email: string, rememberMe: boolean, userId: string }) => void`_

    -   If the user has been authenticated, this function should be called. Most likely, this should be called within the initiateSecurity or logIn actions of the `AuthUIActions` provided to the `AuthUIContextProvider`. Once called, the application will be shown.

    -   **Parameters**:

        -   **args**: _`{ email: string, rememberMe: boolean, userId: string }`_
            -   **email**: _`string`_
                -   Email with which the user authenticate
            -   **rememberMe**: _`boolean`_
                -   Whether the user's email should be visible upon logout.
            -   **userId**: _`string`_
                -   UserId of the authenticated user (may be email).

    -   **Returns**: _`void`_

-   **onUserNotAuthenticated**: _`( clearRememberMe?: boolean, overrideRememberMeEmail?: string) => void`_

    -   If the user has been de-authenticated (either because they logged out or app started with no credentials), this function should be called. Most likely, this should be called within the `initiateSecurity` action of the `AuthUIActions` provided to the `AuthUIContextProvider`, or from a logout event within the application. Once called, the Authentication User Interface will be shown.

    -   **Parameters**:

        -   **clearRememberMe**: (optional) _`boolean`_
            -   If true, clear any "remember me" data upon logout.
        -   **overrideRememberMeEmail**: (optional) _`string`_ - If a value is provided, the `SecurityContextState`'s rememberMe will be set to true and this email will be shown in the email field of Login upon logout.

    -   **Returns**: _`void`_

-   **showChangePassword**: _`() => void`_

    -   Present the Change Password screen to the user (if the user is authenticated). The application will be unmounted.

    -   **Returns**: _`void`_

## SecurityContextState

Basic state upon which to make application security decisions.

### Type Declaration

-   **setPasswordTransit**: _`TransitState`_
    -   Network state for setting a new password for a user who has made a forgot password request.
-   **verifyResetCodeTransit**: _`TransitState`_
    -   Network state for verifying the reset password code for a user who has made a forgot password request.

## SetPasswordState

Network state for a user attempting to set a new password using a verify reset code after requesting forgot password.

### Type Declaration

-   **email**: (optional) _`string`_
    -   Email of the authenticated user.
-   **isAuthenticatedUser**: _`boolean`_
    -   True: The user is authenticated and the application is shown (or the Change Password interface).
    -   False: The user is not authenticated and the Authentication User Interface is shown.
-   **isLoading**: _`boolean`_
    -   True: The security state is being loaded (all other fields are invalid).
    -   False: The security state has been loaded.
-   **isShowingChangePassword**: _`boolean`_
    -   True: The Change Password screen is currently visible.
    -   False: The Change Password screen is not currently visible.
-   **isSignOut**: _`boolean`_
    -   Used for animation purposes only.
    -   True: The user is logged in currently and a change will be the result of logging out.
    -   False: The user is likely logging in if authentication state changes.
-   **rememberMeDetails**: _`{ email?: string, rememberMe?: boolean }`_
    -   Information for a user who wants to be remembered upon logout.
    -   **email**: (optional) _`string`_
        -   Email address to show in the email field of Login after logout.
    -   **rememberMe**: (optional) _`boolean`_
        -   When true, the user's email will be in the email field of Login.
-   **userId**: (optional) _`string`_
    -   UserId of the authenticated user (may be an email).

## TransitState

Keeps track of the state of a network call.

### Type Declaration

-   **transitComplete**: _`boolean`_
    -   Returns true if a network call has completed, either successfully or unsuccessfully.
-   **transitErrorMessage**: _`string | null`_
    -   An error message describing the failure of the last network call, or null if the last call was a success.
-   **transitId**: _`number | null`_
    -   The identifier for a specific network call. Can be used to ignore an old return if a modal dismisses or another action fires.
-   **transitInProgress**: _`boolean`_
    -   Returns true if the network call is currently active and awaiting a response.
-   **transitSuccess**: _`boolean`_
    -   Returns true if the previously completed network call returned without error.

# Contributors

To work on this package as a contributor, first clone down the repository:
```shell
git clone https://github.com/pxblue/react-workflows
cd react-workflows/login-workflow
```

You can install all necessary dependencies and run the demo project by running:
```shell
yarn start:example
// or
yarn start:example-android
```

If you make changes to the library components and want to link them to the running example project, you can run:
```shell
yarn link:workflow
```

You can build the library by running:
```shell
yarn build
```

You can run the lint checks, prettier formatter, unit tests, and build by running:
```shell
yarn precommit
```

You can update the auto-generated licenses.md file by running:
```shell
yarn generate:licenses
```
