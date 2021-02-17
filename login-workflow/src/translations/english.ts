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
        LOGIN_BUTTON: 'Log In',
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
        INSTRUCTIONS:
            'Please select a password. Make sure that your password meets the necessary complexity requirements outlined below.',
        CURRENT_PASSWORD_FORM_LABEL: 'Current Password',
        NEW_PASSWORD_FORM_LABEL: 'New Password',
        CONFIRM_PASSWORD_FORM_LABEL: 'Confirm Password',
        SUCCESS_TITLE: 'Password Changed',
        SUCCESS_DESCRIPTION:
            "Your password was successfully updated! To ensure your account's security, you will need to log in to the application with your updated credentials.",
    },
    CONTACT_SUPPORT: {
        TITLE: 'Contact Us',
        PHONE_NUMBER: undefined,
        EMAIL: undefined,
        EMERGENCY_SUPPORT_DESCRIPTION: (phone: string) =>
            `For technical support, please call <a class="pxb-auth-link" href="tel:${phone}">${phone}</a>.`,
        EMERGENCY_SUPPORT_TITLE: 'Emergency Support',
        GENERAL_SUPPORT_DESCRIPTION: (email: string) =>
            `For questions, feedback, or support please email us at <a class="pxb-auth-link" href="mailto:${email}">${email}</a>.`,
        GENERAL_SUPPORT_TITLE: 'General Questions',
    },
    PASSWORD_CRITERIA: {
        CHARACTER_LIMIT: '8-16 Characters',
        ONE_NUMBER: 'One number',
        ONE_UPPERCASE_CHARACTER: 'One uppercase letter',
        ONE_LOWERCASE_CHARACTER: 'One lowercase letter',
        ONE_SPECIAL_CHARACTER: 'One special character',
    },
    FORGOT_PASSWORD: {
        TITLE: 'Forgot Password',
        INSTRUCTIONS: 'Please enter the account email associated with the account.',
        RESPONSE_TIME_TEXT:
            'If this email has an account with Eaton, you will receive a response within <strong>one business day.</strong>',
        PHONE_NUMBER: undefined,
        CONTACT_SUPPORT_BY_PHONE: (phone: string) =>
            `For urgent account issues, please call <a class="pxb-auth-link" [href]="tel:${phone}">${phone}</a>`,
        SUCCESS_TITLE: 'Email Sent',
        SUCCESS_DESCRIPTION_WITH_EMAIL: 'A link to reset your password has been sent to ',
        SUCCESS_DESCRIPTION_WITHOUT_EMAIL: 'A link to reset your password has been sent.',
    },
};
