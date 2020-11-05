import { InjectionToken } from '@angular/core';

export type PasswordRequirement = {
    description: string;
    regex: RegExp;
};

export type PxbAuthConfig = {
    homeRoute: string;
    authRoute: string;
    allowDebugMode?: boolean;
    contactEmail?: string;
    contactPhone?: string;
    htmlEula?: boolean;
    passwordRequirements?: PasswordRequirement[];
    // @TODO: using this for splash screen... should we use this in place of ng-content for header in the login component? Should we have an additional prop for footerImage
    projectImage?: string;
    showSelfRegistration: boolean;
};

export const PXB_AUTH_CONFIG = new InjectionToken<PxbAuthConfig>('');
