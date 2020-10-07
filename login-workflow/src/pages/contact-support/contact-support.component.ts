import { Component, Inject, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PXB_AUTH_CONFIG, PxbAuthConfig } from '../../config/auth-config';
import { LOGIN_ROUTE } from '../../config/route-names';

@Component({
    selector: 'pxb-contact-support',
    templateUrl: './contact-support.component.html',
    styleUrls: ['./contact-support.component.scss'],
})
export class PxbContactSupportComponent implements OnInit {
    @Input() contactEmail: string = 'something@email.com';
    @Input() contactPhone: string = '1-800-123-4567';
    
    constructor(
        private readonly _router: Router,
        @Inject(PXB_AUTH_CONFIG) private readonly _config: PxbAuthConfig
    ) {}

    ngOnInit(): void {}

    navigateToLogin() {
        void this._router.navigate([`${this._config.authRoute}/${LOGIN_ROUTE}`]);
    }
}
