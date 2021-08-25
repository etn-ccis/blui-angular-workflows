/* eslint-disable @typescript-eslint/naming-convention */

import { PxbAuthTranslations } from './auth-translations';

export const pxbAuthFrenchTranslations: PxbAuthTranslations = {
    GENERAL: {
        BACK_BUTTON: 'Retour',
        OKAY_BUTTON: `D'accord`,
        DONE_BUTTON: 'Fini',
        NEXT_BUTTON: 'Prochain',
        CANCEL_BUTTON: 'Annuler',
        PASSWORD_FORM_LABEL: 'Mot de passe',
        PASSWORD_MISMATCH_ERROR: 'Les mots de passe ne correspondent pas',
        CONFIRM_PASSWORD_FORM_LABEL: 'Confirmez',
        EMAIL_FORM_LABEL: 'Adresse e-mail',
        EMAIL_INVALID_ERROR: "S'il vous plaît entrer un email valide",
        IS_REQUIRED_ERROR: (field: string): string => `${field} est <strong>requis</strong>`,
        LOGIN_BUTTON: 'Connexion',
    },
    LOGIN: {
        CONTACT_SUPPORT: 'Contacter un représentant du support Eaton',
        CREATE_ACCOUNT: 'Créer un compte',
        FORGOT_PASSWORD: 'Mot de passe oublié?',
        NEED_AN_ACCOUNT: 'Besoin dun compte?',
        REMEMBER_ME: 'Souvenez-vous de moi',
        ENABLE_DEBUG_MODE: 'DÉBOGUER',
        DEBUG_MODE: 'MODE DÉBOGAGE',
        FORGOT_PASSWORD_LINK: '[Test Mot de passe oublié Email]',
        TEST_INVITE_LINK: "[Tester le registre d'invitation]",
    },
    CHANGE_PASSWORD: {
        TITLE: 'Changer le mot de passe',
        INSTRUCTIONS:
            'Veuillez sélectionner un mot de passe. Assurez-vous que votre mot de passe répond aux exigences de complexité nécessaires décrites ci-dessous.',
        CURRENT_PASSWORD_FORM_LABEL: 'Mot de passe actuel',
        NEW_PASSWORD_FORM_LABEL: 'Nouveau mot de passe',
        CONFIRM_PASSWORD_FORM_LABEL: 'Confirmez le mot de passe',
        SUCCESS_TITLE: 'Mot de passe changé',
        SUCCESS_DESCRIPTION:
            "Votre mot de passe a été mis à jour avec succès! Pour garantir la sécurité de votre compte, vous devrez vous connecter à l'application avec vos informations d'identification mises à jour.",
    },
    CONTACT_SUPPORT: {
        TITLE: 'Contactez-nous',
        PHONE_NUMBER: undefined,
        EMAIL: undefined,
        EMERGENCY_SUPPORT_DESCRIPTION: (phone: string): string =>
            `Pour une assistance technique, veuillez appeler <a class="pxb-auth-link" href="tel:${phone}">${phone}</a>.`,
        EMERGENCY_SUPPORT_TITLE: `Assistance d'urgence`,
        GENERAL_SUPPORT_DESCRIPTION: (email: string): string =>
            `Pour les questions, commentaires ou assistance par e-mail, veuillez nous envoyer un e-mail à <a class="pxb-auth-link" href="mailto:${email}">${email}</a>.`,
        GENERAL_SUPPORT_TITLE: 'Questions générales',
    },
    PASSWORD_CRITERIA: {
        CHARACTER_LIMIT: '8-16 Caractères',
        ONE_NUMBER: 'Un nombre',
        ONE_UPPERCASE_CHARACTER: 'Une lettre majuscule',
        ONE_LOWERCASE_CHARACTER: 'Une lettre miniscule',
        ONE_SPECIAL_CHARACTER: 'Un caractère spécial',
    },
    FORGOT_PASSWORD: {
        TITLE: 'Mot de passe oublié?',
        INSTRUCTIONS: `Entrez l'adresse e-mail du compte associée au compte.`,
        RESPONSE_TIME_TEXT:
            'Si ce courrier électronique a un compte chez Eaton, vous recevrez une réponse sous <strong>un jour ouvrable</strong>',
        PHONE_NUMBER: undefined,
        CONTACT_SUPPORT_BY_PHONE: (phone: string): string =>
            `Pour les problèmes de compte urgents, veuillez appeler le <a class="pxb-auth-link" href="tel:${phone}">${phone}</a>.`,
        SUCCESS_TITLE: 'Email envoyé',
        SUCCESS_DESCRIPTION: (email: string): string =>
            `Un lien pour réinitialiser votre mot de passe a été envoyé à <strong>${email}</strong>`,
    },
    RESET_PASSWORD: {
        TITLE: 'Réinitialiser le mot de passe',
        INSTRUCTIONS:
            'Veuillez sélectionner un mot de passe. Assurez-vous que votre mot de passe répond aux exigences de complexité nécessaires décrites ci-dessous.',
        RESET_LINK_ERROR_TITLE: 'Erreur',
        RESET_LINK_ERROR_DESCRIPTION: `Une erreur s'est produite lors de la validation de votre code de réinitialisation.`,
        SUCCESS_TITLE: `Votre mot de passe a été réinitialisé avec succès`,
        SUCCESS_DESCRIPTION:
            "Votre mot de passe a été mis à jour avec succès! Pour assurer la sécurité de votre compte, vous devrez vous connecter à l'application avec vos informations d'identification mises à jour.",
    },

    CREATE_ACCOUNT: {
        REGISTRATION_LINK: {
            VALIDATING: 'Valider',
            INVALID_TITLE: 'Erreur',
            INVALID_DESCRIPTION: `Nous n'avons pas pu terminer votre inscription. Appuyez sur Continuer ci-dessous pour finir.`,
        },
        ENTER_EMAIL: {
            TITLE: 'Créer un compte',
            INSTRUCTIONS:
                'Pour créer un compte Eaton, entrez les informations requises ci-dessous. Vous devrez vérifier votre adresse e-mail pour continuer.',
        },
        EULA: {
            TITLE: 'Accord de licence',
            CONFIRM_READ: `J'ai lu et j'accepte les conditions générales`,
            LOAD_ERROR_TITLE: 'Erreur',
            LOAD_ERROR_DESCRIPTION: 'Échec du chargement du contrat de licence',
            RELOAD_BUTTON: 'Recharger',
        },
        VERIFY_EMAIL: {
            TITLE: 'Vérifier les courriels',
            INSTRUCTIONS: `Un code de vérification a été envoyé à l'adresse e-mail que vous avez fournie. Cliquez sur le lien ou entrez le code ci-dessous pour continuer. Ce code est valable 30 minutes.`,
            CODE_FORM_LABEL: 'Code de vérification',
            RESEND_BUTTON: `Renvoyer l'e-mail de vérification`,
        },
        CREATE_PASSWORD: {
            INSTRUCTIONS:
                'Veuillez sélectionner un mot de passe. Assurez-vous que votre mot de passe répond aux exigences de complexité nécessaires décrites ci-dessous.',
            TITLE: 'Créer un Mot de Passe',
        },
        ACCOUNT_DETAILS: {
            FIRST_NAME_FORM_LABEL: 'Prénom',
            INSTRUCTIONS: 'Entrez vos coordonnées ci-dessous pour terminer la création du compte.',
            LAST_NAME_FORM_LABEL: 'Nom de famille',
            TITLE: 'Détails du compte',
        },
        ACCOUNT_CREATED: {
            TITLE: 'Compte créé',
            WELCOME_MESSAGE_TITLE: (username: string): string => `Bienvenue, ${username}`,
            WELCOME_MESSAGE_DESCRIPTION: (email: string): string => {
                const firstSentence = email
                    ? `Votre compte a été créé avec succès avec l'e-mail ${email}.`
                    : `Votre compte à été créé avec succès.`;
                return `${firstSentence} Votre compte a déjà été ajouté à l'organisation. Appuyez sur Continuer ci-dessous pour terminer.`;
            },
            CONTINUE_BUTTON: 'Continue',
        },
        ACCOUNT_EXISTING: {
            TITLE: 'Compte créé',
            WELCOME_MESSAGE_TITLE: 'Bienvenue',
            WELCOME_MESSAGE_DESCRIPTION: (email: string): string => {
                const firstSentence = email
                    ? `Votre compte a été créé avec succès avec l'e-mail ${email}.`
                    : `Votre compte à été créé avec succès.`;
                return `${firstSentence} Veuillez vous connecter avec l'adresse e-mail et le mot de passe de votre compte Eaton.`;
            },
        },
    },
};
