# Angular Auth Workflow 
![npm (scoped)](https://img.shields.io/npm/v/@pxblue/angular-auth-workflow)

The Angular Auth Workflow package provides a consistent authentication and registration experience across Eaton web applications using Angular. 

This includes pre-built implementations of the screens for Login, Forgot Password, Self-Registration, Contact Support, Registration By Invitation, and a dialog for Change Password.

This documentation explains the steps required to integrate this auth workflow into your application.

![Login](https://raw.githubusercontent.com/pxblue/angular-workflows/master/login-workflow/media/login.png) ![Home](https://raw.githubusercontent.com/pxblue/angular-workflows/master/login-workflow/media/home.png) ![Password](https://raw.githubusercontent.com/pxblue/angular-workflows/master/login-workflow/media/password.png)

# Installation
To install the latest version of this package, run:
```shell
npm install @pxblue/angular-auth-workflow
// or
yarn add @pxblue/angular-auth-workflow
```

# Integration
You have two options for using this package in your application. You can manually integrate the package into an existing project, or you can start a project using the `/example` project provided in the package. 

To integrate the package into an existing project, read our [Existing Project Integration](https://github.com/pxblue/angular-workflows/tree/master/login-workflow/docs/existing-project-integration.md) instructions. Even if you are starting from scratch, it may be useful for you to refer to the example project while getting started.

To use the example project as a starting point, read our [Sample Project Integration](https://github.com/pxblue/angular-workflows/tree/master/login-workflow/docs/sample-project-integration.md) instructions.

# Managing State

After setup, you are now able to access various security actions and state from within your application.  

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

## PxbAuthConfig

`PxbAuthConfig` a configuration service; it is used to enable/disable settings in the auth workflow. These properties are typically set only once and do not change. Some UI configuration properties are also passed in.

### Usage

```
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
-   **showSelfRegistration**: _`boolean`_
    -   When true, shows the Create Account button to allow for self registration.
    -   Default: true
-   **showContactSupport**: _`boolean`_
    -   When true, shows the Contact Support link on the Login page.
    -   Default: true
-   **showForgotPassword**: _`boolean`_
    -   When true, shows the Forgot Password link to allow for resetting a password.
    -   Default: true
-   **showRememberMe**: _`boolean`_
    -   When true, shows the Remember Me option on the Login Page.
    -   Default: true
    
> When disabling certain pages from view, make sure to remove the respective page's route from the `authSubRoutes`. 


# Services

This document outlines the various exports and configuration options for the workflow package.

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



# Error Handling

Each `PxbRegisterUIService` and `PxbAuthUIService` API call has a default error message that a user will see when an API call fails.  Each error message can be customized by rejecting a promise with an `ErrorDialogData` object.

## Custom Error Title or Message

Rejecting an API call with an `ErrorDialogData` object allows for custom Dialog titles and message content to be display.

```
export type ErrorDialogData = {
    title: string;
    message: string;
}
```

```
changePassword(oldPassword: string, newPassword: string): Promise<void> {
    return new Promise((resolve, reject) => {
        if (/*fail scenario*/)
            return reject({
                title: 'Error!',
                message: 'This is an example of a custom error message.',
            });
        }
        return resolve();
    }
}
```

## Custom Error Content

In situations where more a complex error dialog is needed (e.g contains a link or images) users can use their own error dialog components.

The example project demos this feature for the login screen; whenever an error happens, we show a custom user-provided dialog component.

To provide your own dialog component, replace the default page-specific `ErrorDialogService` with your own service that will display your custom dialog.

```
// app.module.ts
import { PxbLoginErrorDialogService } from '@pxblue/angular-auth-workflow';
import { LoginErrorDialogService } from 'dialog/login-error-dialog.service';

providers: [
    {
        provide: PxbLoginErrorDialogService,
        useClass: LoginErrorDialogService,
    }
]
```

To enforce type-safety, your `ErrorDialogService` should implement `IPxbAuthErrorDialogService`.

```
import { IPxbAuthErrorDialogService } from '@pxblue/angular-auth-workflow';

@Injectable({
    providedIn: 'root',
})
export class LoginErrorDialogService implements IPxbAuthErrorDialogService {
    constructor(private dialog: MatDialog) {}
    openDialog(): MatDialogRef<[YourDialogComponent]> {
        return this.dialog.open([YourDialogComponent], {
            disableClose: false,
        });
    }
}
```

See the example project (`./src/app/dialog/login-error-dialog.component.ts`) for an example of a custom ErrorDialog component.

# Custom Pages
 
 Each page within the `@pxblue/angular-auth-workflow` can be customized with string `@Inputs` or `ng-content`.  
 
 The Login Page will always need custom header and footer content. To provide your own `pxb-login-header` and `pxb-login-footer`, provide your own `<pxb-login>` template.  This will tell the `<pxb-auth>` component to render your custom content instead of the default.
 
 ```
<pxb-auth [loginRef]="loginPage">
    <ng-template #loginPage>
        <pxb-login [customEmailValidator]="customValidator()">
            <div pxb-login-header>
                <img src="assets/images/eaton_stacked_logo.png" style="max-width: 100%; max-height: 80px;" />
            </div>
            <div pxb-login-footer style="text-align: center;">
                <img
                    src="assets/images/cybersecurity_certified.png"
                    style="max-width: 30%; align-self: center;"
                />
            </div>
        </pxb-login>
    </ng-template>
</pxb-auth>
```


# Custom Account Details
To add custom form fields to the self registration pages, follow the steps below:

### Create a custom `<pxb-create-account>` component.
```angular2
<ng-template #createAccountPage>
    <pxb-create-account [accountDetails]="accountDetails"></pxb-create-account>
</ng-template>

<pxb-auth [createAccountRef]="createAccountPage"></pxb-auth>
``` 

### Add your custom form content as a `<ng-template>`
```angular2
<ng-template #customFormRef>
  <form>
      <mat-form-field appearance="fill">
          <mat-label>Custom Field</mat-label>
          <input matInput [formControl]="customFormControl" required />
          <mat-error *ngIf="customFormControl.hasError('required')">
              Emergency Contact is <strong>required</strong>
          </mat-error>
      </mat-form-field>
  </form>
</ng-template>
```

### Populate the `accountDetails` @Input
Each `accountDetails` object has 3 properties:

`form`: what to render

`formControls`: access what the user entered

`isValid()`: function we run to determine if user-input is valid.


Each `accountDetails` represents a new page in the self-registration process.  
```
import { AccountDetails } from '@pxblue/angular-auth-workflow';


// What to Render
@ViewChild('customFormRef') customFormRef: TemplateRef<MatFormField>;

// To capture user inputs
customFormControl: FormControl;

// An array of accountDetails where each object represents a new page. 
accountDetails: AccountDetails[]; 

ngAfterViewInit(): void {
  this.customFormControl= new FormControl('', Validators.required);
  this.accountDetails = [
      {   /* Page 1 */
          form: this.customFormRef,
          formControls: new Map([['custom', this.customFormControl]]),
          isValid: () => this.customFormControl.value,
      }
  ];
}

```

This solution scales so that a user can have as many pages as they want.  Adding `undefined` as the first entry of the `accountDetails[]` will shift all custom forms onto their own page.  

Check out the Example project to see an example of custom registration forms.


## Auth Component
The Auth Component is the top level `<pxb-auth>` component that houses all pages with the auth workflow.
This component accepts @Inputs for individual page customizations.

<div style="overflow: auto;">

| @Input                    | Description                                    | Type                                           | 
| ------------------------- | ---------------------------------------------- | ---------------------------------------------- |
| contactSupportRef         | Contact Support customizations                 | `TemplateRef<PxbContactSupportComponent>`      |
| createAccountInviteRef    | Create Account via Invite customizations       | `TemplateRef<PxbCreateAccountInviteComponent>` |
| createAccountRef          | Create Account customizations                  | `TemplateRef<PxbCreateAccountComponent>`       |
| forgotPasswordRef         | Forgot Password customizations                 | `TemplateRef<PxbForgotPasswordComponent>`      |
| loginRef                  | Login customizations                           | `TemplateRef<PxbLoginComponent>`               |
| resetPasswordRef          | Reset Password customizations                  | `TemplateRef<PxbResetPasswordComponent>`       |

</div>


## Create Account
The Create Account page is used for self-registration via a link on the Login Page.

<div style="overflow: auto;">

| @Input                    | Description                                                                 | Type                 | Required | Default                        |
| ------------------------- | --------------------------------------------------------------------------- | -------------------- | -------- | ------------------------------ |
| userName                  | Greeting used at the end of user self-registration                          | `string `            | no       | first and last name            |
<!-- 
| accountDetails            | Custom form controls used for self-registration                             | `FormControl[]`      | no       | []                             |
| hasValidAccountDetails    | Used to enable progression when using providing custom account details      | `boolean`            | no       | `false`                        |
| useDefaultAccountDetails  | Set to false to remove Account Details section from self-registration       | `boolean`            | no       | `accountDetails.length === 0`  |

</div>

The following child element is projected into `<pxb-create-account>` and `<pxb-create-account-invite>`.

<div style="overflow: auto;">

| Selector                    | Description                                      | Required |
| --------------------------- | ------------------------------------------------ | -------- | 
| pxb-account-details-form    | Custom form fields for capturing account details | no       |

</div> 
-->

## Create Account via Invite
The Create Account via Invite page is used for self-registration via an email link.  This page currently has the same API as the Create Account page above. 

## Contact Support
The Contact Support page contains information for users who need help accessing/using the application.  

<div style="overflow: auto;">

| @Input                        | Description                                                                 | Type                 | ng-content                            |
| ----------------------------- | --------------------------------------------------------------------------- | -------------------- | ------------------------------------- |  
| emergencySupportDescription   | Emergency support section description                                       | `string`             | `pxb-emergency-support-description`   | 
| emergencySupportTitle         | Emergency support section title                                             | `string`             | `pxb-emergency-support-title`         |  
| generalSupportDescription     | General support section description                                         | `string`             | `pxb-general-support-description`     |   
| generalSupportTitle           | General support section title                                               | `string `            | `pxb-general-support-title`           |
| okayButtonText                | Text that appears in the button at the bottom of the page                   | `string`             | `pxb-okay-button-text`                | 
| pageTitle                     | Page title                                                                  | `string `            | `pxb-page-title`                      |

</div>

## Change Password
The Change Password dialog allows authenticated users to change their password. Since this is a dialog, the `PxbChangePasswordDialogService` is used for text customizations. 

### Usage 

```
import { PxbChangePasswordDialogService } from '@pxblue/angular-auth-workflow';

constructor(pxbChangePasswordService: PxbChangePasswordDialogService) {
    pxbChangePasswordService.pageTitle = 'Custom Change Password Title';
}
```

### API 
<div style="overflow: auto;">

| Prop Name                          | Description                                                                 | Type                | 
| ---------------------------------- | --------------------------------------------------------------------------- | ------------------- | 
| backButtonText                     | Back button text                                                            | `string`            | 
| confirmPasswordFormLabel           | Input field title for confirming new password                               | `string`            | 
| currentPasswordFormLabel           | Input field title for current password                                      | `string`            | 
| loginButtonText                    | Login button text                                                           | `string`            | 
| okayButtonText                     | Okay button text                                                            | `string`            | 
| pageDescription                    | Change password instructions                                                | `string`            | 
| pageTitle                          | Dialog title                                                                | `string`            | 
| passwordChangeSuccessDescription   | Success state description when password is changed                          | `string`            | 
| passwordChangeSuccessTitle         | Success state title when password is changed                                | `string`            | 
| passwordFormLabel                  | Input field title for new password                                          | `string`            | 
| passwordMismatchError              | Error shown when new password and confirm password does not match           | `string`            | 

</div>
## Reset Password
The Reset Password page is normally access via email and contains forms used to change a user's password.
    
<div style="overflow: auto;">

| @Input                             | Description                                                                 | Type                | ng-content                                 |
| ---------------------------------- | --------------------------------------------------------------------------- | ------------------- | ------------------------------------------ |   
| backButtonText                     | Back button text                                                            | `string`            | `pxb-back-button-text`                     |
| confirmPasswordFormLabel           | Confirm password form title                                                 | `string`            |                                            |  
| doneButtonText                     | Done button text                                                            | `string`            | `pxb-done-button-text`                     |
| okayButtonText                     | Okay button text                                                            | `string`            | `pxb-okay-button-text`                     |  
| pageDescription                    | Password reset instructions                                                 | `string`            | `pxb-page-description`                     |
| pageTitle                          | Page title                                                                  | `string`            | `pxb-page-title`                           |
| passwordFormLabel                  | Password form title                                                         | `string`            |                                            |
| passwordMismatchError              | Error seen when passwords do not match                                      | `string`            |                                            |
| resetCodeErrorTitle                | Error state title seen when link validation invalid                         | `string`            | `pxb-reset-code-error-title`               |
| resetCodeErrorDescription          | Error state description seen when link validation is invalid                | `string`            | `pxb-reset-code-error-description`         |
| resetSuccessTitle                  | Success state title when password reset is successful                       | `string`            | `pxb-reset-success-title`                  |
| resetSuccessDescription            | Success state description when password reset is successful                 | `string`            | `pxb-reset-success-description`            |

</div>

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
