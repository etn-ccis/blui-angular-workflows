/* eslint-disable @typescript-eslint/naming-convention */

import { BluiAuthTranslations } from './auth-translations';

export const bluiAuthEnglishTranslations: BluiAuthTranslations = {
    GENERAL: {
        BACK_BUTTON: 'Back',
        OKAY_BUTTON: 'Okay',
        DONE_BUTTON: 'Done',
        NEXT_BUTTON: 'Next',
        CANCEL_BUTTON: 'Cancel',
        PASSWORD_FORM_LABEL: 'Password',
        PASSWORD_MISMATCH_ERROR: 'Passwords do not match',
        CONFIRM_PASSWORD_FORM_LABEL: 'Confirm Password',
        EMAIL_FORM_LABEL: 'Email Address',
        EMAIL_INVALID_ERROR: 'Please enter a valid email address',
        IS_REQUIRED_ERROR: (field: string): string => `${field} is <strong>required</strong>`,
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
        INVALID_CREDENTIALS: 'Incorrect Email or Password',
        ERROR_TITLE: 'Error',
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
        EMERGENCY_SUPPORT_DESCRIPTION: (phone: string): string =>
            `For technical support, please call <a class="blui-auth-link" href="tel:${phone}">${phone}</a>.`,
        EMERGENCY_SUPPORT_TITLE: 'Emergency Support',
        GENERAL_SUPPORT_DESCRIPTION: (email: string): string =>
            `For questions, feedback, or support please email us at <a class="blui-auth-link" href="mailto:${email}">${email}</a>.`,
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
        CONTACT_SUPPORT_BY_PHONE: (phone: string): string =>
            `For urgent account issues, please call <a class="blui-auth-link" href="tel:${phone}">${phone}</a>.`,
        SUCCESS_TITLE: 'Email Sent',
        SUCCESS_DESCRIPTION: (email: string): string =>
            `A link to reset your password has been sent to <strong>${email}</strong>`,
    },
    RESET_PASSWORD: {
        TITLE: 'Reset Password',
        INSTRUCTIONS:
            'Please select a password. Make sure that your password meets the necessary complexity requirements outlined below.',
        RESET_LINK_ERROR_TITLE: 'Error',
        RESET_LINK_ERROR_DESCRIPTION: 'There was an error validating your reset code.',
        SUCCESS_TITLE: 'Your password was successfully reset.',
        SUCCESS_DESCRIPTION:
            "Your password was successfully updated! To ensure your account's security, you will need to log in to the application with your updated credentials.",
    },
    CREATE_ACCOUNT: {
        REGISTRATION_LINK: {
            VALIDATING: 'Validating',
            INVALID_TITLE: 'Error',
            INVALID_DESCRIPTION: 'We were unable to complete your registration. Press continue below to finish.',
        },
        ENTER_EMAIL: {
            TITLE: 'Create an Account',
            INSTRUCTIONS:
                'To register for an Eaton account, enter the required information below. You will need to verify your email address to continue.',
        },
        EULA: {
            TITLE: 'License Agreement',
            CONFIRM_READ: 'I have read and agree to the Terms & Conditions',
            LOAD_ERROR_TITLE: 'Error',
            LOAD_ERROR_DESCRIPTION: 'License Agreement Failed To Load',
            RELOAD_BUTTON: 'Reload',
        },
        VERIFY_EMAIL: {
            TITLE: 'Verify Email',
            INSTRUCTIONS:
                'A verification code has been sent to the email address you provided. Click the link or enter the code below to continue. This code is valid for 30 minutes.',
            CODE_FORM_LABEL: 'Verification Code',
            RESEND_LABEL: "Didn't receive email? ",
            RESEND_BUTTON: 'Send Again',
        },
        CREATE_PASSWORD: {
            INSTRUCTIONS:
                'Please select a password. Make sure that your password meets the necessary complexity requirements outlined below.',
            TITLE: 'Create Password',
        },
        ACCOUNT_DETAILS: {
            FIRST_NAME_FORM_LABEL: 'First Name',
            INSTRUCTIONS: 'Enter your details below to complete account creation.',
            LAST_NAME_FORM_LABEL: 'Last Name',
            TITLE: 'Account Details',
        },
        ACCOUNT_CREATED: {
            TITLE: 'Account Created!',
            WELCOME_MESSAGE_TITLE: (username: string): string => `Welcome, ${username}`,
            WELCOME_MESSAGE_DESCRIPTION: (email: string): string => {
                const firstSentence = email
                    ? `Your account has been successfully created with the email ${email}.`
                    : `Your account has been successfully created.`;
                return `${firstSentence} Your account has already been added to the organization. Press Continue below to finish.`;
            },
            CONTINUE_BUTTON: 'Continue',
        },
        ACCOUNT_EXISTING: {
            TITLE: 'Account Created!',
            WELCOME_MESSAGE_TITLE: 'Welcome',
            WELCOME_MESSAGE_DESCRIPTION: (email: string): string => {
                const firstSentence = email
                    ? `Your account has been successfully created with the email ${email}.`
                    : `Your account has been successfully created.`;
                return `${firstSentence} Please log in with your Eaton account email and password.`;
            },
        },
    },
};
