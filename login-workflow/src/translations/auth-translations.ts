export type PxbAuthTranslations = {
    GENERAL: {
        BACK_BUTTON: string;
        OKAY_BUTTON: string;
        DONE_BUTTON: string;
        NEXT_BUTTON: string;
        PASSWORD_FORM_LABEL: string;
        PASSWORD_MISMATCH_ERROR: string;
        CONFIRM_PASSWORD_FORM_LABEL: string;
        EMAIL_FORM_LABEL: string;
        EMAIL_INVALID_ERROR: string;
        IS_REQUIRED_ERROR: (fieldName: string) => string;
        LOGIN_BUTTON: string;
    };
    LOGIN: {
        CONTACT_SUPPORT: string;
        CREATE_ACCOUNT: string;
        FORGOT_PASSWORD: string;
        NEED_AN_ACCOUNT: string;
        REMEMBER_ME: string;
        ENABLE_DEBUG_MODE: string;
        DEBUG_MODE: string;
        FORGOT_PASSWORD_LINK: string;
        TEST_INVITE_LINK: string;
    };
    FORGOT_PASSWORD: {
        TITLE: string;
        INSTRUCTIONS: string;
        RESPONSE_TIME_TEXT: string;
        PHONE_NUMBER: string;
        CONTACT_SUPPORT_BY_PHONE: (phone: string) => string; // Uses FORGOT_PASSWORD.PHONE_NUMBER or PxbConfig
        SUCCESS_TITLE: string;
        SUCCESS_DESCRIPTION: (email: string) => string;
    };
    RESET_PASSWORD: {
        TITLE: string;
        INSTRUCTIONS: string;
        RESET_CODE_ERROR_TITLE: string;
        RESET_CODE_ERROR_DESCRIPTION: string;
        SUCCESS_TITLE: string;
        SUCCESS_DESCRIPTION: string;
    };
    CHANGE_PASSWORD: {
        TITLE: string;
        INSTRUCTIONS: string;
        CURRENT_PASSWORD_FORM_LABEL: string;
        NEW_PASSWORD_FORM_LABEL: string;
        CONFIRM_PASSWORD_FORM_LABEL: string;
        SUCCESS_TITLE: string;
        SUCCESS_DESCRIPTION: string;
    };
    CONTACT_SUPPORT: {
        TITLE: string;
        PHONE_NUMBER: string;
        EMAIL: string;
        EMERGENCY_SUPPORT_DESCRIPTION: (phone: string) => string; // Uses CONTACT_SUPPORT.PHONE_NUMBER or PxbConfig
        EMERGENCY_SUPPORT_TITLE: string;
        GENERAL_SUPPORT_DESCRIPTION: (email: string) => string; // Uses CONTACT_SUPPORT.EMAIL or PxbConfig
        GENERAL_SUPPORT_TITLE: string;
    };
    CREATE_ACCOUNT: {
        REGISTRATION_LINK: {
            VALIDATING: string;
            INVALID_TITLE: string;
            INVALID_DESCRIPTION: string;
        };
        ENTER_EMAIL: {
            TITLE: string;
            INSTRUCTIONS: string;
        };
        EULA: {
            TITLE: string;
            CONFIRM_READ: string;
            LOAD_ERROR_TITLE: string;
            LOAD_ERROR_DESCRIPTION: string;
            RELOAD_BUTTON: string;
        };
        VERIFY_EMAIL: {
            TITLE: string;
            INSTRUCTIONS: string;
            CODE_FORM_LABEL: string;
            RESEND_BUTTON: string;
        };
        CREATE_PASSWORD: {
            INSTRUCTIONS: string;
            TITLE: string;
        };
        ACCOUNT_DETAILS: {
            FIRST_NAME_FORM_LABEL: string;
            INSTRUCTIONS: string;
            LAST_NAME_FORM_LABEL: string;
            TITLE: string;
        };
        ACCOUNT_CREATED: {
            TITLE: string;
            WELCOME_MESSAGE_TITLE: (username: string) => string;
            WELCOME_MESSAGE_DESCRIPTION: (email: string) => string;
            CONTINUE_BUTTON: string;
        };
    };
    PASSWORD_CRITERIA: {
        CHARACTER_LIMIT: string;
        ONE_NUMBER: string;
        ONE_UPPERCASE_CHARACTER: string;
        ONE_LOWERCASE_CHARACTER: string;
        ONE_SPECIAL_CHARACTER: string;
    };
};
