# Auth Workflow Services

After setup, you can now use the services listed below to customize the auth module, access auth-state, and provide your own custom API calls. 

At a high-level, the services available are:

* `PxbAuthConfig` - Used to customize general auth-workflow settings.
* `PxbAuthSecurityService` - Used to access auth-state.
* `PxbAuthUIService` - Custom API calls for logging a user in and maintaining an existing account. 
* `PxbRegisterUIService` - Custom API calls for registering a new user.
* `PxbChangePasswordDialogService` - Used to configure the Change Password dialog.


## PxbAuthConfig

`PxbAuthConfig` a configuration service; it is used to enable/disable settings in the auth workflow. These properties are typically set only once and do not change. Some UI configuration properties are also passed in.

> This object must be configured on application load (app.component.ts) for all settings to correctly apply. 

### Usage

```
// app.component.ts
import { PxbAuthConfig } from '@pxblue/angular-auth-workflow';

constructor(pxbAuthConfig: PxbAuthConfig) {
    pxbAuthConfig.projectImage = 'assets/images/eaton_stacked_logo.png';
    pxbAuthConfig.backgroundImage = 'assets/images/background.svg';
    pxbAuthConfig.allowDebugMode = true;
    pxbAuthConfig.showSelfRegistration = false;
}
```

### Properties

-   **allowDebugMode** (optional): _`boolean`_
    -   When true, presents a debug button on the login screen to allow access to deep link-based screens/flows
    -   Default: false
-   **backgroundImage** (optional): _`string`_
    -   Background image to be used within the auth workflow
-   **contactEmail** (optional): _`string`_
    -   Contact email address to be shown on the support screen
    -   Default: provides a fake email address
-   **contactPhone** (optional): _`string`_
    -   Contact phone number to be shown on the support screen (human-readable for display only).
    -   Default: provides a fake phone number
-   **eulaScrollLock** (optional): _`boolean`_
    -   Requires the EULA to be completed scrolled through before a user can accept it.
    -   Default: true
-   **passwordRequirements** (optional): _`PasswordRequirement[]`_
    -   An array of `PasswordRequirement` that must be satisfied when creating or changing a password.  
    -   Default: Passwords must contain a number, uppercase letter, lowercase letter, special character, and be between 8 and 16 characters in length.  The default array can be extended or replaced to include custom requirements.
-   **projectImage** (optional): _`string`_
    -   Project image shown on splash screen and login screen.
    -   Dimensions of the image should be 534w x 152h with a transparent background. Differently sized images may not render properly on all devices.
    -   Default: Provides an example project image.
-   **showCreateAccount**: _`boolean`_
    -   When true, shows the Create Account button to allow for self registration.
    -   Default: true
-   **showCreateAccountViaInvite**: _`boolean`_
    -   When true, enables the Create Account via Invite workflow. 
    -   Default: true
-   **showContactSupport**: _`boolean`_
    -   When true, shows the Contact Support link on the Login page.
    -   Default: true
-   **showForgotPassword**: _`boolean`_
    -   When true, shows the Forgot Password link to allow for resetting a password.
    -   Default: true
-   **showResetPassword**: _`boolean`_
    -   When true, enables the Reset Password workflow. 
    -   Default: true
-   **showRememberMe**: _`boolean`_
    -   When true, shows the Remember Me option on the Login Page.
    -   Default: true
    
## PxbAuthSecurityService 

`PxbAuthSecurityService` is a service used to store authentication state.  Pages with the auth workflow will look to this service for information about a current user and their authentication state. 

### Usage 

```
import { PxbAuthSecurityService, AUTH_ROUTE } from '@pxblue/angular-auth-workflow';

constructor(private readonly _pxbSecurityService: PxbAuthSecurityService) {}

logout(): void {
   this._pxbSecurityService.updateSecurityState({ isAuthenticatedUser: false });
   void this._router.navigate([AUTH_ROUTE]);
}
```
   
## PxbAuthSecurityService

`PxbAuthSecurityService` provides user authentication state and updates as a user logs in/out. Pages within the workflow use this service for info about whether or not a user is authenticated, check if an API call is happening, etc.  It is not meant to authenticate the user or hold credential information. 

### Usage

```ts
import { PxbAuthSecurityService, AUTH_ROUTE } from '@pxblue/angular-auth-workflow';

constructor(private readonly _pxbSecurityService: PxbAuthSecurityService) {}

logout(): void {
   this._pxbSecurityService.updateSecurityState({ isAuthenticatedUser: false });
   void this._router.navigate([AUTH_ROUTE]);
}
```

### Methods

-   **getSecurityState**: _`SecurityContext`_
    -   Returns current security state
-   **updateSecurityState(newState: SecurityContext)**: _`void`_
    -   Accepts any new state prop and applies to the the current state.
-   **securityStateChanges**: _`Observable<SecurityContext>`_
    -   An observable that emits when the security state changes
-   **onUserAuthenticated**: _`void`_
    -   Should be called when a user authenticates; updates state accordingly.
-   **onUserNotAuthenticated**: _`Observable<SecurityContext>`_
    -   Should be called when the user is no longer authenticated; updates state accordingly. 

## SecurityContext

`SecurityContext` retains user-provided state information.

### Type Declaration

-   **email**: _`string`_
    -   UserId of the authenticated user (may be an email).
-   **userId**: _`string`_
    -   Information for a user who wants to be remembered upon logout.
-   **rememberMeDetails**: _`{ email: string; rememberMe: boolean }`_
    -   Email and Remember Me state provided when a user logs in.
-   **isLoading**: _`boolean`_
    -   Loading indicator when performing API calls.
-   **isAuthenticatedUser**: _`boolean`_
    -   Whether the user has logged in or is otherwise authenticated.
    

## PxbAuthUIService

`PxbAuthUIService` contains methods that are intended to call APIs to perform auth-related actions.  A mock `PxbAuthUIService` is provided in the examples folder to provide a placeholder for API calls.

### Usage

You will need to provide your own service implementation with real API calls.

```
// app.module.ts
import { PxbAuthUIService } from '@pxblue/angular-auth-workflow';
import { AuthUIService } from 'services/auth-ui.service';

providers: [
    {
        provide: PxbAuthUIService,
        useClass: AuthUIService,
    }
]
```

### Methods

-   **changePassword**: _`(oldPassword: string, newPassword: string): Promise<void>`_

    -   An authenticated user wants to change their password. The application should try to change the user's password. Upon completion, the user will be logged out of the application. Upon cancellation, the user will be taken back to the application's home screen.

    -   **Parameters**:

        -   **oldPassword**: _`string`_
            -   The user's current password as entered into the UI.
        -   **newPassword**: _`string`_
            -   The user's new password as entered into the UI.

-   **forgotPassword**: _`(email: string): Promise<void>`_

    -   The user has forgotten their password and wants help. The application generally should call an API which will then send a password reset link to the user's email.

    -   **Parameters**:

        -   **email**: _`string`_
            -   Email address the user uses to log in to the application.

-   **initiateSecurity**: _`() => Promise<void>`_

    -   Initialize the application security state. This will involve reading any local storage, validating existing credentials (token expiration, for example). At the end of validation, the SecurityContextActions should be called with either: onUserAuthenticated (which will present the application), or onUserNotAuthenticated (which will present the Auth UI).
    -   Should always resolve, never throw.
        > Note: Until this method returns, the applications Splash screen will be presented.

-   **login**: _`(email: string, password: string, rememberMe: boolean): Promise<void>`_

    -   The user wants to log into the application. Perform a login with the user's credentials. The application should provide the user's email and password to the authentication server.

    -   **Parameters**:

        -   **email**: _`string`_
            -   Email address the user entered into the UI.
        -   **password**: _`string`_
            -   Password the user entered into the UI.
        -   **rememberMe**: _`boolean`_
            -   Indicates whether the user's email should be remembered on success.

-   **setPassword**: _`(password: string) => Promise<void>`_

    -   A user who has previously used "forgotPassword" now has a valid password reset link and has entered a new password. The application should take the user's newly entered password and then reset the user's current password.

        > Note: Upon success, the user will be taken to the Login screen

    -   **Parameters**:

        -   **password**: _`string`_
            -   New Password the user entered into the UI

-   **verifyResetCode**: _`() => Promise<void>`_

    -   The user has tapped on an email with a password reset link, which they received after requesting help for forgetting their password. This API call validates the reset link is legitimate and the app should allow a user to enter a new password. 

## PxbRegisterUIService

`PxbAuthUIService` contains methods that are intended to call APIs to perform registration-related actions. A mock `PxbRegistrerUIService` is provided in the examples folder to provide a placeholder for API calls.

### Usage

You will need to provide your own service implementation with real API calls.

```
// app.module.ts
import { PxbRegisterUIService } from '@pxblue/angular-auth-workflow';
import { RegisterUIService } from 'services/register-ui.service';

providers: [
    {
        provide: PxbRegisterUIService,
        useClass: RegisterUIService,
    }
]
```

### Methods

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

-   **loadEULA**: _`(): Promise<string>`_

    -   The user wants to complete an action but must first accept the EULA. The application should retrieve an application-specific EULA for the user.
    
    -   **Returns**: _`Promise<string>`_
        -   Resolve with EULA, otherwise reject with an error message.

-   **requestRegistrationCode**: _`(email: string): Promise<void>`_

    -   The user entered their email address and accepted the EULA. The API should now send them an email with the validation code.

    -   **Parameters**:

        -   **email**: _`string`_
            -   The email address for the registering user.

-   **validateUserRegistrationRequest**: _`(code: string) => Promise<boolean>`_

    -   The user has been sent a verification code to an email they have provided; validate the verification code has been received to continue account registration.

    -   **Parameters**:

        -   **code**: _`string`_
            -   Registration code provided from the link.



    
## PxbChangePasswordDialogService

The Change Password page is the only page in the auth workflow that is accessible via a dialog box and not an angular route. 
When a password is changed, the dialog box will be dismissed automatically. To show the Change Password dialog, see the usage below. 
    
### Usage

```
import { PxbChangePasswordDialogService } from '@pxblue/angular-auth-workflow';

constructor(public readonly _pxbChangePasswordService: PxbChangePasswordDialogService) {}

openDialog() {
    this._pxbChangePasswordService.openDialog();
}
```
