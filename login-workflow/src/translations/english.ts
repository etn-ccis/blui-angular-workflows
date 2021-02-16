import { PxbAuthTranslations } from './auth-translations';

export const english: any = {
    GENERAL: {
        BACK_BUTTON: 'Back',
        OKAY_BUTTON: 'Okay',
        DONE_BUTTON: 'Done',
        PASSWORD_FORM_LABEL: 'Password',
        PASSWORD_MISMATCH_ERROR: 'Passwords do not match',
        CONFIRM_PASSWORD_FORM_LABEL: 'Confirm Password',
        EMAIL_FORM_LABEL: 'Email Address',
        EMAIL_INVALID_ERROR: 'Please enter a valid email address',
        IS_REQUIRED_ERROR: (field: string) => `${field} is <strong>required</strong>`,
        LOGIN_BUTTON: 'Log In'
    },
    LOGIN: {
        CONTACT_SUPPORT: 'Contact an Eaton Support Representative',
        CREATE_ACCOUNT: 'Create Account',
        FORGOT_PASSWORD: 'Forgot your password?',
        NEED_AN_ACCOUNT: 'Need an account?',
        REMEMBER_ME: 'Remember Me',
        ENABLE_DEBUG_MODE: 'DEBUG',
        DEBUG_MODE: 'DEBUG_MODE',
        FORGOT_PASSWORD_LINK: '[Test Forgot Password Email]',
        TEST_INVITE_LINK: '[Test Invite Register]',
    },
    CHANGE_PASSWORD: {
        TITLE: 'Change Password',
        INSTRUCTIONS: 'Please select a password. Make sure that your password meets the necessary complexity requirements outlined below.',
        CURRENT_PASSWORD_FORM_LABEL: 'Current Password',
        NEW_PASSWORD_FORM_LABEL: 'New Password',
        CONFIRM_PASSWORD_FORM_LABEL: 'Confirm Password',
        SUCCESS_TITLE: 'Password Changed',
        SUCCESS_DESCRIPTION: 'Your password was successfully updated! To ensure your account\'s security, you will need to log in to the application with your updated credentials.'
    },
};
