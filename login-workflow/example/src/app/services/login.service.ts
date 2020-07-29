import { Injectable } from '@angular/core';
import { IPxbLoginService } from '@pxblue/angular-auth-workflow';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root',
})
export class CustomLoginService implements IPxbLoginService {
    constructor(private readonly _router: Router) {}

    login(): Promise<boolean> {
        return new Promise((resolve) => {
            setTimeout(() => {
                void this._router.navigate(['home']);
                resolve(true);
            }, 1500);
        });
    }
}
