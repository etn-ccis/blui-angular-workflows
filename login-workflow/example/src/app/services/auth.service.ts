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
                console.log('app login method called');
                // void this._router.navigate(['home']);
                resolve(true);
            }, 1500);
        });
    }

    createAccount(): Promise<boolean> {
        return Promise.resolve(true);
    }

    forgotPassword(): Promise<boolean> {
        return Promise.resolve(true);
    }
}
