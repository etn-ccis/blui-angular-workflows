import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { LOGIN_ROUTE } from '../../auth/auth.routes';
import { PxbAuthConfig } from '../../services/config/auth-config';

@Component({
    selector: 'pxb-contact-support',
    templateUrl: './contact-support.component.html',
    styleUrls: ['./contact-support.component.scss'],
})
export class PxbContactSupportComponent {
    @Input() contactEmail = 'something@email.com';
    @Input() contactPhone = '1-800-123-4567';

    constructor(private readonly _router: Router, private readonly _authConfig: PxbAuthConfig) {}

    navigateToLogin(): void {
        void this._router.navigate([`${this._authConfig.authRoute}/${LOGIN_ROUTE}`]);
    }
}
