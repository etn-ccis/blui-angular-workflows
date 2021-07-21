/* eslint-disable @typescript-eslint/naming-convention */

import { PxbAuthTranslations } from './auth-translations';

export const pxbAuthSpanishTranslations: PxbAuthTranslations = {
    GENERAL: {
        BACK_BUTTON: 'Atrás',
        OKAY_BUTTON: 'Okey',
        DONE_BUTTON: 'Hecho',
        NEXT_BUTTON: 'Próxima',
        CANCEL_BUTTON: 'Cancelar',
        PASSWORD_FORM_LABEL: 'Contraseña',
        PASSWORD_MISMATCH_ERROR: 'Las contraseñas no coinciden',
        CONFIRM_PASSWORD_FORM_LABEL: 'Confirmar Contraseña',
        EMAIL_FORM_LABEL: 'Dirección de correo electrónico',
        EMAIL_INVALID_ERROR: 'Por favor, introduce una dirección de correo electrónico válida',
        IS_REQUIRED_ERROR: (field: string): string => `${field} se <strong>requiere</strong>`,
        LOGIN_BUTTON: 'Iniciar sesión',
    },
    LOGIN: {
        CONTACT_SUPPORT: 'Póngase en contacto con un representante de soporte de Eaton',
        CREATE_ACCOUNT: 'Crear una cuenta',
        FORGOT_PASSWORD: '¿Olvidaste tu contraseña?',
        NEED_AN_ACCOUNT: '¿Necesito una cuenta?',
        REMEMBER_ME: 'Recuérdame',
        ENABLE_DEBUG_MODE: 'DEPURAR',
        DEBUG_MODE: 'MODO DE DEPURACIÓN',
        FORGOT_PASSWORD_LINK: '[Prueba Olvidé mi contraseña Correo electrónico]',
        TEST_INVITE_LINK: '[Prueba Invitar Registrarse]',
    },
    CHANGE_PASSWORD: {
        TITLE: 'Cambiar la contraseña',
        INSTRUCTIONS:
            'Seleccione una contraseña. Asegúrese de que su contraseña cumpla con los requisitos de complejidad necesarios que se describen a continuación.',
        CURRENT_PASSWORD_FORM_LABEL: 'Contraseña actual',
        NEW_PASSWORD_FORM_LABEL: 'Nueva contraseña',
        CONFIRM_PASSWORD_FORM_LABEL: 'Confirmar Contraseña',
        SUCCESS_TITLE: 'Contraseña cambiada',
        SUCCESS_DESCRIPTION:
            '¡Tu contraseña se actualizó correctamente! Para garantizar la seguridad de su cuenta, deberá iniciar sesión en la aplicación con sus credenciales actualizadas.',
    },
    CONTACT_SUPPORT: {
        TITLE: 'Contacta con nosotras',
        PHONE_NUMBER: undefined,
        EMAIL: undefined,
        EMERGENCY_SUPPORT_DESCRIPTION: (phone: string): string =>
            `Para soporte técnico, por favor llame <a class="pxb-auth-link" href="tel:${phone}">${phone}</a>.`,
        EMERGENCY_SUPPORT_TITLE: 'Soporte de emergencia',
        GENERAL_SUPPORT_DESCRIPTION: (email: string): string =>
            `Si tiene preguntas, comentarios o asistencia, envíenos un correo electrónico a <a class="pxb-auth-link" href="mailto:${email}">${email}</a>.`,
        GENERAL_SUPPORT_TITLE: 'Preguntas generales',
    },
    PASSWORD_CRITERIA: {
        CHARACTER_LIMIT: '8-16 caracteres',
        ONE_NUMBER: 'Un número',
        ONE_UPPERCASE_CHARACTER: 'Una letra mayúscula',
        ONE_LOWERCASE_CHARACTER: 'Una letra minúscula',
        ONE_SPECIAL_CHARACTER: 'Un personaje especial',
    },
    FORGOT_PASSWORD: {
        TITLE: 'Has olvidado tu contraseña',
        INSTRUCTIONS: 'Ingrese el correo electrónico de la cuenta asociado con la cuenta.',
        RESPONSE_TIME_TEXT:
            'Si este correo electrónico tiene una cuenta con Eaton, recibirá una respuesta dentro de <strong>un dia laboral.</strong>',
        PHONE_NUMBER: undefined,
        CONTACT_SUPPORT_BY_PHONE: (phone: string): string =>
            `Para problemas urgentes con la cuenta, llame <a class="pxb-auth-link" href="tel:${phone}">${phone}</a>.`,
        SUCCESS_TITLE: 'Email enviado',
        SUCCESS_DESCRIPTION: (email: string): string =>
            `Se ha enviado un enlace para restablecer su contraseña a ${email}`,
    },
    RESET_PASSWORD: {
        TITLE: 'Restablecer la contraseña',
        INSTRUCTIONS:
            'Seleccione una contraseña. Asegúrese de que su contraseña cumpla con los requisitos de complejidad necesarios que se describen a continuación.',
        RESET_LINK_ERROR_TITLE: 'Error',
        RESET_LINK_ERROR_DESCRIPTION: 'Hubo un error al validar su código de reinicio.',
        SUCCESS_TITLE: 'Tu contraseña se restableció correctamente.',
        SUCCESS_DESCRIPTION:
            '¡Tu contraseña se actualizó correctamente! Para garantizar la seguridad de su cuenta, deberá iniciar sesión en la aplicación con sus credenciales actualizadas.',
    },

    CREATE_ACCOUNT: {
        REGISTRATION_LINK: {
            VALIDATING: 'Validando',
            INVALID_TITLE: 'Error',
            INVALID_DESCRIPTION: 'Hubo un error durante el registro de la cuenta.',
        },
        ENTER_EMAIL: {
            TITLE: 'Crea una cuenta',
            INSTRUCTIONS:
                'Para registrarse para una cuenta Eaton, ingrese la información requerida a continuación. Deberá verificar su dirección de correo electrónico para continuar.',
        },
        EULA: {
            TITLE: 'Acuerdo de licencia',
            CONFIRM_READ: 'He leído y acepto los Términos y condiciones.',
            LOAD_ERROR_TITLE: 'Error',
            LOAD_ERROR_DESCRIPTION: 'No se pudo cargar el acuerdo de licencia',
            RELOAD_BUTTON: 'Recargar',
        },
        VERIFY_EMAIL: {
            TITLE: 'Verificar correo electrónico',
            INSTRUCTIONS:
                'Se ha enviado un código de verificación a la dirección de correo electrónico que proporcionó. Haga clic en el enlace o ingrese el código a continuación para continuar. Este código es válido por 30 minutos.',
            CODE_FORM_LABEL: 'Código de verificación',
            RESEND_BUTTON: 'Reenviar correo electrónico de verificación',
        },
        CREATE_PASSWORD: {
            INSTRUCTIONS:
                'Seleccione una contraseña. Asegúrese de que su contraseña cumpla con los requisitos de complejidad necesarios que se describen a continuación.',
            TITLE: 'Crear contraseña',
        },
        ACCOUNT_DETAILS: {
            FIRST_NAME_FORM_LABEL: 'Primer nombre',
            INSTRUCTIONS: 'Ingrese sus datos a continuación para completar la creación de la cuenta.',
            LAST_NAME_FORM_LABEL: 'Apellido',
            TITLE: 'detalles de la cuenta',
        },
        ACCOUNT_CREATED: {
            TITLE: 'Cuenta creada',
            WELCOME_MESSAGE_TITLE: (username: string): string => `Bienvenidas, ${username}`,
            WELCOME_MESSAGE_DESCRIPTION: (email: string): string => {
                const firstSentence = email
                    ? `Su cuenta ha sido creada con éxito con el correo electrónico ${email}.`
                    : `Tu cuenta ha sido creada satisfactoriamente.`;
                return `${firstSentence} Su cuenta ya se ha agregado a la organización. Presione Continuar a continuación para finalizar.`;
            },
            CONTINUE_BUTTON: 'Continuar',
        },
        ACCOUNT_EXISTING: {
            TITLE: 'Cuenta creada',
            WELCOME_MESSAGE_TITLE: 'Bienvenidas',
            WELCOME_MESSAGE_DESCRIPTION: (email: string): string => {
                const firstSentence = email
                    ? `Su cuenta ha sido creada con éxito con el correo electrónico ${email}.`
                    : `Tu cuenta ha sido creada satisfactoriamente.`;
                return `${firstSentence} Inicie sesión con el correo electrónico y la contraseña de su cuenta de Eaton.`;
            },
        },
    },
};
