import { InjectionToken } from '@angular/core';

export type PxbAuthConfig = {
    homeRoute: string;
    authRoute: string;
};

export const PXB_AUTH_CONFIG = new InjectionToken<PxbAuthConfig>('');
