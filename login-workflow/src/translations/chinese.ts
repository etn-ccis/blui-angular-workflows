/* eslint-disable @typescript-eslint/naming-convention */

import { BluiAuthTranslations } from './auth-translations';

export const bluiAuthChineseTranslations: BluiAuthTranslations = {
    GENERAL: {
        BACK_BUTTON: '上一步',
        OKAY_BUTTON: '好的',
        DONE_BUTTON: '完成',
        NEXT_BUTTON: '下一步',
        CANCEL_BUTTON: '取消',
        PASSWORD_FORM_LABEL: '密码',
        PASSWORD_MISMATCH_ERROR: '密码不匹配',
        CONFIRM_PASSWORD_FORM_LABEL: '确认密码',
        EMAIL_FORM_LABEL: '邮箱地址',
        EMAIL_INVALID_ERROR: '请输入有效的电子邮件地址',
        IS_REQUIRED_ERROR: (field: string): string => `${field}为必填项`,
        LOGIN_BUTTON: '登录',
    },
    LOGIN: {
        CONTACT_SUPPORT: '联系伊顿客服人员',
        CREATE_ACCOUNT: '创建账号',
        FORGOT_PASSWORD: '忘记密码？',
        NEED_AN_ACCOUNT: '需要建立新账号？',
        REMEMBER_ME: '记住我的登录信息',
        ENABLE_DEBUG_MODE: '调试',
        DEBUG_MODE: '调试模式',
        FORGOT_PASSWORD_LINK: '[测试忘记密码的电子邮件]',
        TEST_INVITE_LINK: '[测试邀请注册]',
        INVALID_CREDENTIALS: '邮箱地址或密码错误',
        ERROR_TITLE: '错误！',
    },
    CHANGE_PASSWORD: {
        TITLE: '修改密码',
        INSTRUCTIONS: '请输入您的新密码。请确保您的新密码符合以下列出的密码复杂度要求。',
        CURRENT_PASSWORD_FORM_LABEL: '当前密码',
        NEW_PASSWORD_FORM_LABEL: '新密码',
        CONFIRM_PASSWORD_FORM_LABEL: '确认新密码',
        SUCCESS_TITLE: '密码已修改',
        SUCCESS_DESCRIPTION: '已更新您的密码。安全起见，您需要用新密码重新登录。',
    },
    CONTACT_SUPPORT: {
        TITLE: '联系我们',
        PHONE_NUMBER: undefined,
        EMAIL: undefined,
        EMERGENCY_SUPPORT_DESCRIPTION: (phone: string): string =>
            `如需技术协助，请拨打 <a class="blui-auth-link" href="tel:${phone}">${phone}</a>.`,
        EMERGENCY_SUPPORT_TITLE: '紧急协助',
        GENERAL_SUPPORT_DESCRIPTION: (email: string): string =>
            `如果您有疑问、建议或需要协助，欢迎用邮件联系我们： <a class="blui-auth-link" href="mailto:${email}">${email}</a>.`,
        GENERAL_SUPPORT_TITLE: '一般问题',
    },
    PASSWORD_CRITERIA: {
        CHARACTER_LIMIT: '8至16个字符',
        ONE_NUMBER: '1个数字',
        ONE_UPPERCASE_CHARACTER: '1个大写字母',
        ONE_LOWERCASE_CHARACTER: '1个小写字母',
        ONE_SPECIAL_CHARACTER: '1个特殊字符',
    },
    FORGOT_PASSWORD: {
        TITLE: '忘记密码',
        INSTRUCTIONS: '请输入账户邮箱地址。',
        RESPONSE_TIME_TEXT:
            '如果伊顿系统中存在此邮箱地址注册的账号的话，您会在<strong>一个工作日</strong>内收到我们的回复。',
        PHONE_NUMBER: undefined,
        CONTACT_SUPPORT_BY_PHONE: (phone: string): string =>
            `如遇紧急账户问题，请拨打联系电话<a class="blui-auth-link" href="tel:${phone}">${phone}</a>.`,
        SUCCESS_TITLE: '邮件已发送',
        SUCCESS_DESCRIPTION: (email: string): string => `重设密码的链接已发送至 <strong>${email}</strong>`,
    },
    RESET_PASSWORD: {
        TITLE: '重置密码',
        INSTRUCTIONS: '请输入您的新密码。请确保您的新密码符合以下列出的密码复杂度要求。',
        RESET_LINK_ERROR_TITLE: '错误！',
        RESET_LINK_ERROR_DESCRIPTION: '验证您的重置码时出错。',
        SUCCESS_TITLE: '您的密码已成功重置。',
        SUCCESS_DESCRIPTION: '您的密码已成功更新！为了确保您账号的安全，您将需要使用更新后的凭据登录到该应用程序。',
    },

    CREATE_ACCOUNT: {
        REGISTRATION_LINK: {
            VALIDATING: '证实',
            INVALID_TITLE: '错误！',
            INVALID_DESCRIPTION: '注册账号时出错。',
        },
        ENTER_EMAIL: {
            TITLE: '创建账号',
            INSTRUCTIONS: '请输入下列信息以注册伊顿账号。您需要先验证您的邮箱地址。',
        },
        EULA: {
            TITLE: '许可协议',
            CONFIRM_READ: '我已阅读并同意条款及细则',
            LOAD_ERROR_TITLE: '错误！',
            LOAD_ERROR_DESCRIPTION: '许可协议无法加载',
            RELOAD_BUTTON: '重装',
        },
        VERIFY_EMAIL: {
            TITLE: '验证邮箱',
            INSTRUCTIONS:
                '已向您的邮箱中发送了一封验证邮件。请点击邮件中的链接，或者在此输入邮件中的验证码。验证邮件在30分钟内有效。',
            CODE_FORM_LABEL: '验证码',
            RESEND_LABEL: '没有收到电子邮件？',
            RESEND_BUTTON: '重新发送',
        },
        CREATE_PASSWORD: {
            INSTRUCTIONS: '请输入您的新密码。请确保您的新密码符合以下列出的密码复杂度要求。',
            TITLE: '创建密码',
        },
        ACCOUNT_DETAILS: {
            FIRST_NAME_FORM_LABEL: '名',
            INSTRUCTIONS: '请输入下列个人信息来完成账号注册。',
            LAST_NAME_FORM_LABEL: '姓',
            TITLE: '账号详细资料',
        },
        ACCOUNT_CREATED: {
            TITLE: '账号已创建',
            WELCOME_MESSAGE_TITLE: (username: string): string => `欢迎，${username}`,
            WELCOME_MESSAGE_DESCRIPTION: (email: string): string => {
                const firstSentence = email ? `您的账号已通过电子邮件${email}成功创建。` : `您的账号已经创建成功。`;
                return `${firstSentence} 您的账号已被添加到组织中。请按下面的“继续”按钮完成。`;
            },
            CONTINUE_BUTTON: '继续',
        },
        ACCOUNT_EXISTING: {
            TITLE: '账号已创建',
            WELCOME_MESSAGE_TITLE: '欢迎',
            WELCOME_MESSAGE_DESCRIPTION: (email: string): string => {
                const firstSentence = email ? `您的账号已通过电子邮件${email}成功创建。` : `您的账号已经创建成功。`;
                return `${firstSentence} 请使用您的伊顿账号电子邮件和密码登录。`;
            },
        },
    },
};
