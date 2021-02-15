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

## Login 
The Login page is used to log in to an application; it is also a gateway to other pages, such as Contact Support or Forgot Password.

<div style="overflow: auto;">

| @Input                             | Description                                                                 | Type                | ng-content                                   |
| ---------------------------------- | --------------------------------------------------------------------------- | ------------------- | -------------------------------------------- |   
| contactSupportText                 | Link to the Contact Support page                                            | `string`            |                                              |    
| createAccountText                  | Link to create an account                                                   | `string`            |                                              |    
| customEmailValidator               | Custom email regex requirements                                             | `ValidatorFn`       |                                              |
| emailFormLabel                     | Email form label                                                            | `string`            |                                              |  
| emailInvalidError                  | Error seen when an invalid email is entered                                 | `string`            |                                              |    
| emailRequiredError                 | Error seen when email is missing                                            | `string`            |                                              |  
| forgotPasswordText                 | Forgot password text                                                        | `string`            |                                              |      
| loginButtonText                    | Login button text                                                           | `string`            |                                              |    
| needAnAccountText                  | Need an account text                                                        | `string`            |                                              |  
| passwordFormLabel                  | Password form label                                                         | `string`            |                                              |   
| rememberMeText                     | Remember me text                                                            | `string`            |                                              |     

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

| @Input                                   | Description                                                                 | Type                | ng-content                                          |
| ---------------------------------------- | --------------------------------------------------------------------------- | ------------------- | --------------------------------------------------- |   
| accountCreatedPageTitle                  | Title on the Account Created page                                           | `string`            |                                                     |
| accountCreatedWelcomeMessageTitle        | Welcome message seen when account is created                                | `string`            | `pxb-account-created-welcome-message-title`         |
| accountCreatedWelcomeMessageDescription  | Welcome description seen when account is created                            | `string`            | `pxb-account-created-welcome-message-description`   |
| accountDetails                           | Custom form controls used for self-registration                             | `AccountDetails[]`  |                                                     |
| accountDetailsFirstNameFormLabel         | First name form field label on account details page                         | `string`            |                                                     |
| accountDetailsFirstNameRequiredError     | Error seen when the first name is missing                                   | `string`            |                                                     |
| accountDetailsInstructions               | Account details instructions                                                | `string`            | `pxb-account-details-instructions`                  |
| accountDetailsLastNameFormLabel          | Last name form field label on account details page                          | `string`            |                                                     |
| accountDetailsLastNameRequiredError      | Error seen when last name is missing                                        | `string`            |                                                     |
| accountDetailsPageTitle                  | Title on the Account Details page                                           | `string`            |                                                     |
| enterEmailFormLabel                      | Email form label                                                            | `string`            |                                                     |  
| enterEmailInstructions                   | Instructions on the email input page                                        | `string`            | `pxb-enter-email-instructions`                      |       
| enterEmailInvalidError                   | Error seen when an invalid email is entered                                 | `string`            |                                                     |   
| enterEmailPageTitle                      | Title on the email input page                                               | `string`            |                                                     |         
| enterEmailRequiredError                  | Error seen when email is missing                                            | `string`            |                                                     |  
| createPasswordConfirmFormLabel           | Confirm password form label                                                 | `string`            |                                                     |
| createPasswordFormLabel                  | Password form label                                                         | `string`            |                                                     | 
| createPasswordInstructions               | Password creation instructions                                              | `string`            | `pxb-create-password-instructions`                  |
| createPasswordPageTitle                  | Title on the Create Password page                                           | `string`            |                                                     | 
| createPasswordMismatchError              | Error seen when passwords do not match                                      | `string`            |                                                     |
| eulaPageTitle                            | Title on License Agreement page                                             | `string`            |                                                     |
| eulaConfirmReadText                      | Text affirming the user has read the EULA                                   | `string`            |                                                     | 
| verifyEmailPageTitle                     | Title on Verify Email page                                                  | `string`            |                                                     |
| verifyEmailInstructions                  | Instructions on the Verify Email page                                       | `string`            | `pxb-verify-email-instructions`                     |
| verifyEmailCodeFormLabel                 | Verification code form label                                                | `string`            |                                                     |  
| verifyEmailCodeRequiredError             | Error seen when the verification code is missing                            | `string`            |                                                     |  
| verifyEmailResendButton                  | Text in the Resend Verification Code button                                 | `string`            |                                                     | 
| backButtonText                           | Back button text                                                            | `string`            |                                                     |
| nextButtonText                           | Next button text                                                            | `string`            |                                                     |    
| doneButtonText                           | Continue button text                                                        | `string`            |                                                     |    


## Create Account via Invite 
A user has received an email invite to create an account; this workflow can be split into the following steps:

1. Accept EULA
2. Create Password
3. Enter Account Details
4. Confirm Account Created

<div style="overflow: auto;">

| @Input                                   | Description                                                                 | Type                | ng-content                                          |
| ---------------------------------------- | --------------------------------------------------------------------------- | ------------------- | --------------------------------------------------- |   
| accountCreatedPageTitle                  | Title on the Account Created page                                           | `string`            |                                                     |
| accountCreatedWelcomeMessageTitle        | Welcome message seen when account is created                                | `string`            | `pxb-account-created-welcome-message-title`         |
| accountCreatedWelcomeMessageDescription  | Welcome description seen when account is created                            | `string`            | `pxb-account-created-welcome-message-description`   |
| accountDetails                           | Custom form controls used for self-registration                             | `AccountDetails[]`  |                                                     |
| accountDetailsFirstNameFormLabel         | First name form field label on account details page                         | `string`            |                                                     |
| accountDetailsFirstNameRequiredError     | Error seen when the first name is missing                                   | `string`            |                                                     |
| accountDetailsInstructions               | Account details instructions                                                | `string`            | `pxb-account-details-instructions`                  |
| accountDetailsLastNameFormLabel          | Last name form field label on account details page                          | `string`            |                                                     |
| accountDetailsLastNameRequiredError      | Error seen when last name is missing                                        | `string`            |                                                     |
| accountDetailsPageTitle                  | Title on the Account Details page                                           | `string`            |                                                     |
| createPasswordConfirmFormLabel           | Confirm password form label                                                 | `string`            |                                                     |
| createPasswordFormLabel                  | Password form label                                                         | `string`            |                                                     | 
| createPasswordInstructions               | Password creation instructions                                              | `string`            | `pxb-create-password-instructions`                  |
| createPasswordPageTitle                  | Title on the Create Password page                                           | `string`            |                                                     | 
| createPasswordMismatchError              | Error seen when passwords do not match                                      | `string`            |                                                     |
| eulaPageTitle                            | Title on License Agreement page                                             | `string`            |                                                     |
| eulaConfirmReadText                      | Text affirming the user has read the EULA                                   | `string`            |                                                     | 
| backButtonText                           | Back button text                                                            | `string`            |                                                     |
| nextButtonText                           | Next button text                                                            | `string`            |                                                     |    
| doneButtonText                           | Continue button text                                                        | `string`            |                                                     |  
| validatingRegistrationLinkMsg            | Loading message shown when validating registration link                     | `string`            |                                                     |  
| invalidRegistrationLinkTitle             | Error state title when registration link is invalid                         | `string`            | `pxb-invalid-registration-link-title`               |  
| invalidRegistrationLinkDescription       | Error state description when registration link is invalid                   | `string`            | `pxb-invalid-registration-link-description`         |  
  

</div>

## Contact Support
The Contact Support page contains information for users who need help accessing/using the application.  

<div style="overflow: auto;">

| @Input                        | Description                                                                 | Type                 | ng-content                            |
| ----------------------------- | --------------------------------------------------------------------------- | -------------------- | ------------------------------------- |  
| emergencySupportDescription   | Emergency support section description                                       | `string`             | `pxb-emergency-support-description`   | 
| emergencySupportTitle         | Emergency support section title                                             | `string`             |                                       |  
| generalSupportDescription     | General support section description                                         | `string`             | `pxb-general-support-description`     |   
| generalSupportTitle           | General support section title                                               | `string `            |                                       |
| okayButtonText                | Text that appears in the button at the bottom of the page                   | `string`             |                                       | 
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
| doneButtonText                     | Done button text                                                            | `string`            |                                            |  
| emailFormLabel                     | Email form title                                                            | `string`            |                                            |
| okayButtonText                     | Okay button text                                                            | `string`            |                                            |  
| pageInstructions                   | Password reset instructions                                                 | `string`            | `pxb-page-instructions`                    |
| phoneContactDescription            | Instructions for who to contact for help                                    | `string`            | `pxb-phone-contact-description`            | 
| businessResponseDescription        | Description of when to expect a response                                    | `string`            | `pxb-business-response-description`        |
| pageTitle                          | Page title                                                                  | `string`            |                                            |
| successTitle                       | Success state title when email send is successful                           | `string`            | `pxb-success-title`                        |
| successDescription                 | Success state description email send is successful                          | `string`            | `pxb-success-description`                  |
| includeEmailInSuccessMessage       | Whether to include the email in the success message                         | `boolean`           |                                            |

</div>


