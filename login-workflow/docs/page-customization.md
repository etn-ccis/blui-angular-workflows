# Page Customizations
 
Each page within the `@pxblue/angular-auth-workflow` can be customized with string `@Inputs` or `ng-content`.  
 
## Text and HTML Overrides

Each text element within the auth workflow has the ability to be overwritten.  These text-configuration files can be located [here](https://github.com/pxblue/angular-workflows/tree/master/login-workflow/src/translations).  

The example below shows how to edit the English config file: 

## Usage
```
import { pxbAuthEnglishTranslations, PxbAuthTranslations, PxbAuthTranslationsOverride, mergeAuthTranslations }  from '@pxblue/angular-auth-workflow';

ngOnInit(): void {
    // For single text element changes: 
    pxbAuthEnglishTranslations.GENERAL.BACK_BUTTON = 'Go Back';
    
    // For multi-line or from your own config file:
    const authEnglishOverrides: PxbAuthTranslationsOverride = {
        GENERAL: { ... }
        LOGIN: { ... },
        CREATE_ACCOUNT: { ... },
    };
    mergeAuthTranslations(pxbAuthEnglishTranslations, authEnglishOverrides);
}
```

## PxbAuthComponent
The PxbAuthComponent is a wrapper component that houses the individual pages within the auth workflow.
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

 ## Usage
 The Login Page will always need custom header and footer content. 
 
 To provide your own `pxb-login-header` and `pxb-login-footer`, provide your own `<pxb-login>` template.  This will tell the `<pxb-auth>` component to render your custom content instead of the default.
 
 ```
<ng-template #loginPage>
    <pxb-login>
        <div pxb-login-header>...</div>
        <div pxb-login-footer>...</div>
    </pxb-login>
</ng-template>

<pxb-auth [loginRef]="loginPage"></pxb-auth>
```

## Login 
The Login page is used to log in to an application; it is also a gateway to other pages, such as Contact Support or Forgot Password.


![Login](https://raw.githubusercontent.com/pxblue/angular-workflows/master/login-workflow/media/login.png) 

<div style="overflow: auto;">

| @Input                             | Description                                                                 | Type                | 
| ---------------------------------- | --------------------------------------------------------------------------- | ------------------- |   
| customEmailValidator               | Custom email regex requirements                                             | `ValidatorFn`       | 

</div>

## Create Account
The Create Account page is used for self-registration via a link on the Login Page; this workflow can be split into the following steps:

1. Provide Email
2. Accept EULA
3. Confirm Email
4. Create Password
5. Enter Account Details
6. Confirm Account Created

For a more detailed explanation of how to add custom account details, check out our [custom-account-details docs](https://github.com/pxblue/angular-workflows/tree/master/login-workflow/docs/custom-account-details.md).

<div style="overflow: auto;">

| @Input                                   | Description                                                                 | Type                | 
| ---------------------------------------- | --------------------------------------------------------------------------- | ------------------- |    
| accountDetails                           | Custom form controls used for self-registration                             | `AccountDetails[]`  |   
| customEmailValidator                     | Custom email regex requirements                                             | `ValidatorFn`       | 
| registrationSuccessScreen                | Custom account registration success screen                                  | `TemplateRef`       | 

> The `registrationSuccessScreen` TemplateRef has access to all form input values.  See the example project for more details. 

## Create Account via Invite 
A user has received an email invite to create an account; this workflow can be split into the following steps:

1. Accept EULA
2. Create Password
3. Enter Account Details
4. Confirm Account Created

<div style="overflow: auto;">

| @Input                                   | Description                                                                 | Type                
| ---------------------------------------- | --------------------------------------------------------------------------- | ------------------- |
| accountDetails                           | Custom form controls used for self-registration                             | `AccountDetails[]`  | 
| registrationSuccessScreen                | Custom account registration success screen                                  | `TemplateRef`       | 

</div>

<div style="overflow: auto;">

|  ng-content                                 | Description                                                                 |
| ------------------------------------------- | --------------------------------------------------------------------------- |
| `pxb-registration-link-error-title`         | Error state title seen when the registration link is invalid                | 
| `pxb-registration-link-error-description`   | Error state description seen when the registration link is invalid          | 

</div>

## Contact Support
The Contact Support page contains information for users who need help accessing/using the application.  

![Contact Support](https://raw.githubusercontent.com/pxblue/angular-workflows/master/login-workflow/media/contact-support.png) 

<div style="overflow: auto;">

|  ng-content                   | Description                                                                 |
| ----------------------------- | --------------------------------------------------------------------------- |
| `pxb-icon`                    | Icon at top of the page                                                     | 
| `pxb-instructions`            | Instructions overrides for page body                                        | 

</div>

## Change Password
The Change Password dialog allows authenticated users to change their password. Since this is a dialog, the `PxbChangePasswordDialogService` is used for text customizations. 

![Change Password](https://raw.githubusercontent.com/pxblue/angular-workflows/master/login-workflow/media/change-password.png) 

### Usage 

```
import { PxbChangePasswordDialogService } from '@pxblue/angular-auth-workflow';

constructor(pxbChangePasswordService: PxbChangePasswordDialogService) {
    pxbChangePasswordService.pageTitle = 'Custom Change Password Title';
}
```

## Reset Password
The Reset Password page is normally access via email and contains forms used to change a user's password.
   
![Reset Password](https://raw.githubusercontent.com/pxblue/angular-workflows/master/login-workflow/media/reset-password.png) 

<div style="overflow: auto;">

|  ng-content                           | Description                                                                 |
| ------------------------------------- | --------------------------------------------------------------------------- |
| `pxb-reset-link-error-title`          | Error state title seen when reset password link is invalid                  | 
| `pxb-reset-link-error-description`    | Error state description seen when reset password link is invalid            | 

</div>

## Forgot Password
The Forgot Password page allows a user to request a reset password email. 

![Forgot Password](https://raw.githubusercontent.com/pxblue/angular-workflows/master/login-workflow/media/forgot-password.png) 
    
<div style="overflow: auto;">

| @Input                             | Description                                                                 | Type                | ng-content                                 |
| ---------------------------------- | --------------------------------------------------------------------------- | ------------------- | ------------------------------------------ |   
| customEmailValidator               | Custom email regex requirements                                             | `ValidatorFn`       |                                            |

</div>


