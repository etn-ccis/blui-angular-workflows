import { Injectable } from '@angular/core';
import { IPxbAuthApiService } from '@pxblue/angular-auth-workflow';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root',
})
export class AuthService implements IPxbAuthApiService {
    constructor(private readonly _router: Router) {}

    login(): Promise<boolean> {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(true);
            }, 1000);
        });
    }

    createAccount(): Promise<boolean> {
        return Promise.resolve(true);
    }

    forgotPassword(): Promise<boolean> {
        return Promise.resolve(true);
    }
}
