import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AUTH_ROUTES } from '../../auth/auth.routes';
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
    @Input() title = 'Contact Us';
    @Input() buttonText = 'Okay';
    @Input() generalSupportTitle = 'General Questions';
    @Input() generalSupportDescription: string;
    @Input() emergencySupportTitle = 'Emergency Support';
    @Input() emergencySupportDescription: string;

    constructor(private readonly _router: Router, public authConfig: PxbAuthConfig) {}

    ngOnInit(): void {
        this.generalSupportDescription = `
        For questions, feedback, or support please email us at
        <a class="pxb-auth-link" href="mailto:${this.authConfig.contactEmail}">${this.authConfig.contactEmail}</a
        >.
`;

        this.emergencySupportDescription = `
            For technical support, please call
            <a class="pxb-auth-link" href="tel:${this.authConfig.contactPhone}">
              ${this.authConfig.contactPhone}
            </a>.
          `;
    }

    navigateToLogin(): void {
        void this._router.navigate([`${AUTH_ROUTES.AUTH_WORKFLOW}/${AUTH_ROUTES.LOGIN}`]);
    }
}
