/* eslint-disable @typescript-eslint/naming-convention */

import { PxbAuthTranslations } from './auth-translations';

export const pxbAuthChineseTranslations: PxbAuthTranslations = {
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
        IS_REQUIRED_ERROR: (field: string): string => `${field} 是必须的`,
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
            `如需技术协助，请拨打 <a class="pxb-auth-link" href="tel:${phone}">${phone}</a>.`,
        EMERGENCY_SUPPORT_TITLE: '紧急协助',
        GENERAL_SUPPORT_DESCRIPTION: (email: string): string =>
            `如果您有疑问、建议或需要协助，欢迎用邮件联系我们： <a class="pxb-auth-link" href="mailto:${email}">${email}</a>.`,
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
            `如遇紧急账户问题，请拨打联系电话<a class="pxb-auth-link" href="tel:${phone}">${phone}</a>.`,
        SUCCESS_TITLE: '邮件已发送',
        SUCCESS_DESCRIPTION: (email: string): string => `重设密码的链接已发送至 <strong>${email}</strong>`,
    },
    RESET_PASSWORD: {
        TITLE: '重置密码',
        INSTRUCTIONS: '请输入您的新密码。请确保您的新密码符合以下列出的密码复杂度要求。',
        RESET_LINK_ERROR_TITLE: '错误！',
        RESET_LINK_ERROR_DESCRIPTION: '验证您的重置码时出错。',
        SUCCESS_TITLE: '您的密码已成功重置。',
        SUCCESS_DESCRIPTION: '您的密码已成功更新！为了确保您帐户的安全，您将需要使用更新后的凭据登录到该应用程序。',
    },

    CREATE_ACCOUNT: {
        REGISTRATION_LINK: {
            VALIDATING: '证实',
            INVALID_TITLE: '错误！',
            INVALID_DESCRIPTION: '注册帐户时出错。',
        },
        ENTER_EMAIL: {
            TITLE: '创建账号',
            INSTRUCTIONS: '无法完成注册。请点击“继续”退出。',
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
            RESEND_BUTTON: '重新发送验证邮件',
        },
        CREATE_PASSWORD: {
            INSTRUCTIONS: '请输入您的新密码。请确保您的新密码符合以下列出的密码复杂度要求。',
            TITLE: '创建密码',
        },
        ACCOUNT_DETAILS: {
            FIRST_NAME_FORM_LABEL: '名',
            INSTRUCTIONS: '请输入下列个人信息来完成账号注册。',
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
