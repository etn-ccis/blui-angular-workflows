/* eslint-disable @typescript-eslint/naming-convention */

import { PxbAuthTranslations } from './auth-translations';

export const pxbAuthChineseTranslations: PxbAuthTranslations = {
    GENERAL: {
        BACK_BUTTON: '上一步',
        OKAY_BUTTON: '好的',
        DONE_BUTTON: '完成',
        NEXT_BUTTON: 'Next',
        PASSWORD_FORM_LABEL: '密码',
        PASSWORD_MISMATCH_ERROR: '密码不匹配',
        CONFIRM_PASSWORD_FORM_LABEL: '确认密码',
        EMAIL_FORM_LABEL: '电子邮件地址',
        EMAIL_INVALID_ERROR: '请输入有效的电子邮件地址',
        IS_REQUIRED_ERROR: (field: string): string => `${field} 是必须的`,
        LOGIN_BUTTON: '登录',
    },
    LOGIN: {
        CONTACT_SUPPORT: '联系伊顿支持代表',
        CREATE_ACCOUNT: '创建帐号',
        FORGOT_PASSWORD: '忘记密码了吗？',
        NEED_AN_ACCOUNT: '需要一个账户？',
        REMEMBER_ME: '记得我',
        ENABLE_DEBUG_MODE: '调试',
        DEBUG_MODE: '调试模式',
        FORGOT_PASSWORD_LINK: '[测试忘记密码的电子邮件]',
        TEST_INVITE_LINK: '[测试邀请注册]',
    },
    CHANGE_PASSWORD: {
        TITLE: '更改密码',
        INSTRUCTIONS: '请选择一个密码。确保您的密码满足以下概述的必要复杂性要求。',
        CURRENT_PASSWORD_FORM_LABEL: '当前密码',
        NEW_PASSWORD_FORM_LABEL: '新密码',
        CONFIRM_PASSWORD_FORM_LABEL: '确认密码',
        SUCCESS_TITLE: '密码已更改',
        SUCCESS_DESCRIPTION: '您的密码已成功更新！为了确保您帐户的安全，您将需要使用更新后的凭据登录到该应用程序。',
    },
    CONTACT_SUPPORT: {
        TITLE: '联系我们',
        PHONE_NUMBER: undefined,
        EMAIL: undefined,
        EMERGENCY_SUPPORT_DESCRIPTION: (phone: string): string =>
            `如需技术支持，请致电 <a class="pxb-auth-link" href="tel:${phone}">${phone}</a>.`,
        EMERGENCY_SUPPORT_TITLE: '紧急支援',
        GENERAL_SUPPORT_DESCRIPTION: (email: string): string =>
            `如有疑问，反馈或支持，请给我们发电子邮件 <a class="pxb-auth-link" href="mailto:${email}">${email}</a>.`,
        GENERAL_SUPPORT_TITLE: '一般的问题',
    },
    PASSWORD_CRITERIA: {
        CHARACTER_LIMIT: '8-16个字符',
        ONE_NUMBER: '一个号码',
        ONE_UPPERCASE_CHARACTER: '一个大写字母',
        ONE_LOWERCASE_CHARACTER: '一个小写字母',
        ONE_SPECIAL_CHARACTER: '一个特殊字符',
    },
    FORGOT_PASSWORD: {
        TITLE: '忘记密码',
        INSTRUCTIONS: '请输入与该帐户关联的帐户电子邮件。',
        RESPONSE_TIME_TEXT: '\n' + '如果此电子邮件具有Eaton的帐户，您将在一个工作日内收到答复。',
        PHONE_NUMBER: undefined,
        CONTACT_SUPPORT_BY_PHONE: (phone: string): string =>
            `如有紧急帐户问题，请致电 <a class="pxb-auth-link" href="tel:${phone}">${phone}</a>.`,
        SUCCESS_TITLE: '邮件已发送',
        SUCCESS_DESCRIPTION: (email: string): string => `重设密码的链接已发送至 ${email}`,
    },
    RESET_PASSWORD: {
        TITLE: '重设密码',
        INSTRUCTIONS: '请选择一个密码。确保您的密码满足以下概述的必要复杂性要求。',
        RESET_LINK_ERROR_TITLE: '错误',
        RESET_LINK_ERROR_DESCRIPTION: '验证您的重置码时出错。',
        SUCCESS_TITLE: '您的密码已成功重置。',
        SUCCESS_DESCRIPTION: '您的密码已成功更新！为了确保您帐户的安全，您将需要使用更新后的凭据登录到该应用程序。',
    },

    CREATE_ACCOUNT: {
        REGISTRATION_LINK: {
            VALIDATING: '证实',
            INVALID_TITLE: '错误',
            INVALID_DESCRIPTION: '注册帐户时出错。',
        },
        ENTER_EMAIL: {
            TITLE: '创建一个帐户',
            INSTRUCTIONS: '要注册Eaton帐户，请在下面输入所需信息。您需要验证您的电子邮件地址才能继续。.',
        },
        EULA: {
            TITLE: '许可协议',
            CONFIRM_READ: '我已阅读并同意条款和条件',
            LOAD_ERROR_TITLE: '错误',
            LOAD_ERROR_DESCRIPTION: '许可协议无法加载',
            RELOAD_BUTTON: '重装',
        },
        VERIFY_EMAIL: {
            TITLE: '验证邮件',
            INSTRUCTIONS: '验证码已发送到您提供的电子邮件地址。点击链接或输入下面的代码以继续。此代码有效期为30分钟。',
            CODE_FORM_LABEL: '验证码',
            RESEND_BUTTON: '重新发送验证电子邮件',
        },
        CREATE_PASSWORD: {
            INSTRUCTIONS: '请选择一个密码。确保您的密码满足以下概述的必要复杂性要求。',
            TITLE: '创建密码',
        },
        ACCOUNT_DETAILS: {
            FIRST_NAME_FORM_LABEL: '名',
            INSTRUCTIONS: '在下面输入您的详细信息以完成帐户创建。',
            LAST_NAME_FORM_LABEL: '姓',
            TITLE: '帐户详细资料',
        },
        ACCOUNT_CREATED: {
            TITLE: '帐户已创建',
            WELCOME_MESSAGE_TITLE: (username: string): string => `欢迎, ${username}`,
            WELCOME_MESSAGE_DESCRIPTION: (email: string): string => {
                const firstSentence = email ? `您的帐户已通过电子邮件成功创建 ${email}。` : `您的帐户已经创建成功。`;
                return `${firstSentence} 您的帐户已被添加到组织中。按下面的继续完成。`;
            },
            CONTINUE_BUTTON: '继续',
        },
        ACCOUNT_EXISTING: {
            TITLE: '帐户已创建',
            WELCOME_MESSAGE_TITLE: '欢迎',
            WELCOME_MESSAGE_DESCRIPTION: (email: string): string => {
                const firstSentence = email ? `您的帐户已通过电子邮件成功创建 ${email}。` : `您的帐户已经创建成功。`;
                return `${firstSentence} 请使用您的Eaton帐户电子邮件和密码登录。`;
            },
        },
    },
};
