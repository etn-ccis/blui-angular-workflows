import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LOGIN_ROUTE } from '../../auth/auth.routes';
import { PxbAuthConfig } from '../../services/config/auth-config';

@Component({
    selector: 'pxb-contact-support',
    templateUrl: './contact-support.component.html',
    styleUrls: ['./contact-support.component.scss'],
    host: {
        class: 'pxb-contact-support',
    },
})
export class PxbContactSupportComponent {
    constructor(private readonly _router: Router, public authConfig: PxbAuthConfig) {}

    navigateToLogin(): void {
        void this._router.navigate([`${this.authConfig.authRoute}/${LOGIN_ROUTE}`]);
    }
}
