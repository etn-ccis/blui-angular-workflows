# Page Customizations
 
 Each page within the `@pxblue/angular-auth-workflow` can be customized with string `@Inputs` or `ng-content`.  
 

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

## Create Account
The Create Account page is used for self-registration via a link on the Login Page.

For a more detailed explanation of how to add custom account details, check out our [custom-account-details ](https://github.com/pxblue/angular-workflows/tree/master/login-workflow/docs/custom-account-details.md).

<div style="overflow: auto;">

| @Input                    | Description                                                                 | Type                 | Required | Default                        |
| ------------------------- | --------------------------------------------------------------------------- | -------------------- | -------- | ------------------------------ |
| userName                  | Greeting used at the end of user self-registration                          | `string `            | no       | first and last name            |
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

## Create Account via Invite 
A user has received an email invite to create an account.
    
<div style="overflow: auto;">

| @Input                             | Description                                                                 | Type                | ng-content                                   |
| ---------------------------------- | --------------------------------------------------------------------------- | ------------------- | -------------------------------------------- |   
| eulaTitle                          | Title on License Agreement page                                             | `string`            |                                              |
| eulaConfirmRead                    | Text affirming the user has read the EULA                                   | `string`            | `pxb-eula-confirm-read`                      |  
| createPasswordTitle                | Title on the Create Password page                                           | `string`            |                                              |    
| createPasswordInstructions         | Password creation instructions                                              | `string`            | `pxb-create-password-instructions`           |
| passwordFormLabel                  | Password form title                                                         | `string`            | `pxb-password-form-label`                    | 
| confirmPasswordFormLabel           | Confirm password form title                                                 | `string`            | `pxb-confirm-password-form-label`            |
| passwordMismatchError              | Error seen when passwords do not match                                      | `string`            |                                              |
| accountDetailsTitle                | Title on the Account Details page                                           | `string`            |                                              |
| accountDetailsInstructions         | Account details instructions                                                | `string`            | `pxb-account-details-instructions`           |
| accountCreatedTitle                | Title on the Account Created page                                           | `string`            |                                              |
| successTitle                       | Success state title when email send is successful                           | `string`            | `pxb-success-title`                          |
| successDescription                 | Success state description email send is successful                          | `string`            | `pxb-success-description`                    |
| includeEmailInSuccessMessage       | Whether to include the email in the success message                         | `boolean`           |                                              |
| backButtonText                     | Back button text                                                            | `string`            |                                              |
| nextButtonText                     | Next button text                                                            | `string`            |                                              |    
| doneButtonText                     | Done button text                                                            | `string`            |                                              |    
| okayButtonText                     | Okay button text                                                            | `string`            |                                              |  
| validatingRegistrationLinkMsg      | Loading message shown when validating registration link                     | `string`            |                                              |  
| invalidRegistrationLinkTitle       | Error state title when registration link is invalid                         | `string`            | `pxb-invalid-registration-link-title`        |  
| invalidRegistrationLinkDescription | Error state description when registration link is invalid                   | `string`            | `pxb-invalid-registration-link-description`  |  

</div>

## Create Account via Invite
The Create Account via Invite page is used for self-registration via an email link.  This page currently has the same API as the Create Account page above. 

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


## Contact Support
The Contact Support page contains information for users who need help accessing/using the application.  

<div style="overflow: auto;">

| @Input                        | Description                                                                 | Type                 | ng-content                            |
| ----------------------------- | --------------------------------------------------------------------------- | -------------------- | ------------------------------------- |  
| emergencySupportDescription   | Emergency support section description                                       | `string`             | `pxb-emergency-support-description`   | 
| emergencySupportTitle         | Emergency support section title                                             | `string`             |                                       |  
| generalSupportDescription     | General support section description                                         | `string`             | `pxb-general-support-description`     |   
| generalSupportTitle           | General support section title                                               | `string `            |                                       |
| okayButtonText                | Text that appears in the button at the bottom of the page                   | `string`             | `pxb-okay-button-text`                | 
| pageTitle                     | Page title                                                                  | `string `            |                                       |

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
| backButtonText                     | Back button text                                                            | `string`            |                                            |
| confirmPasswordFormLabel           | Confirm password form title                                                 | `string`            |                                            |  
| doneButtonText                     | Done button text                                                            | `string`            |                                            |
| okayButtonText                     | Okay button text                                                            | `string`            |                                            |  
| pageDescription                    | Password reset instructions                                                 | `string`            | `pxb-page-description`                     |
| pageTitle                          | Page title                                                                  | `string`            |                                            |
| passwordFormLabel                  | Password form title                                                         | `string`            |                                            |
| passwordMismatchError              | Error seen when passwords do not match                                      | `string`            |                                            |
| resetCodeErrorTitle                | Error state title seen when link validation invalid                         | `string`            | `pxb-reset-code-error-title`               |
| resetCodeErrorDescription          | Error state description seen when link validation is invalid                | `string`            | `pxb-reset-code-error-description`         |
| resetSuccessTitle                  | Success state title when password reset is successful                       | `string`            | `pxb-reset-success-title`                  |
| resetSuccessDescription            | Success state description when password reset is successful                 | `string`            | `pxb-reset-success-description`            |

</div>

## Forgot Password
The Forgot Password page allows a user to request a reset password email. 
    
<div style="overflow: auto;">

| @Input                             | Description                                                                 | Type                | ng-content                                 |
| ---------------------------------- | --------------------------------------------------------------------------- | ------------------- | ------------------------------------------ |   
| backButtonText                     | Back button text                                                            | `string`            |                                            |
| okayButtonText                     | Okay button text                                                            | `string`            |                                            |  
| doneButtonText                     | Done button text                                                            | `string`            |                                            |  
| pageInstructions                   | Password reset instructions                                                 | `string`            | `pxb-page-instructions`                    |
| phoneContactDescription            | Instructions for who to contact for help                                    | `string`            | `pxb-phone-contact-description`            | 
| businessResponseDescription        | Description of when to expect a response                                    | `string`            | `pxb-business-response-description`        |
| pageTitle                          | Page title                                                                  | `string`            |                                            |
| emailFormLabel                     | Email form title                                                            | `string`            |                                            |
| successTitle                       | Success state title when email send is successful                           | `string`            | `pxb-success-title`                        |
| successDescription                 | Success state description email send is successful                          | `string`            | `pxb-success-description`                  |
| includeEmailInSuccessMessage       | Whether to include the email in the success message                         | `boolean`           |                                            |

</div>


