import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AUTH_ROUTES } from '../../auth/auth.routes';
import { PxbAuthConfig } from '../../services/config/auth-config';
import { isEmptyView } from '../../util/view-utils';

@Component({
    selector: 'pxb-contact-support',
    templateUrl: './contact-support.component.html',
    styleUrls: ['./contact-support.component.scss'],
    host: {
        class: 'pxb-contact-support',
    },
})
export class PxbContactSupportComponent implements OnInit, AfterViewInit {
    @Input() pageTitle = 'Contact Us';
    @Input() okayButtonText = 'Okay';
    @Input() generalSupportTitle = 'General Questions';
    @Input() generalSupportDescription: string;
    @Input() emergencySupportTitle = 'Emergency Support';
    @Input() emergencySupportDescription: string;

    @ViewChild('icon') iconEl: ElementRef;
    @ViewChild('pageTitleVC') pageTitleEl;
    @ViewChild('okayButtonTextVC') okayButtonTextEl;
    @ViewChild('generalSupportTitleVC') generalSupportTitleEl;
    @ViewChild('generalSupportDescriptionVC') generalSupportDescriptionEl;
    @ViewChild('emergencySupportTitleVC') emergencySupportTitleEl;
    @ViewChild('emergencySupportDescriptionVC') emergencySupportDescriptionEl;
    isEmpty = (el: ElementRef): boolean => isEmptyView(el);

    constructor(
        public authConfig: PxbAuthConfig,
        private readonly _router: Router,
        private readonly _changeDetectorRef: ChangeDetectorRef
    ) {}

    ngOnInit(): void {
        if (this.generalSupportDescription === undefined) {
            this.generalSupportDescription = `
                For questions, feedback, or support please email us at
                <a class="pxb-auth-link" href="mailto:${this.authConfig.contactEmail}">
                    ${this.authConfig.contactEmail}
                </a>.
            `;
        }

        if (this.emergencySupportDescription === undefined) {
            this.emergencySupportDescription = `
                For technical support, please call
                <a class="pxb-auth-link" href="tel:${this.authConfig.contactPhone}">
                  ${this.authConfig.contactPhone}
                </a>.
            `;
        }
    }

    ngAfterViewInit(): void {
        this._changeDetectorRef.detectChanges();
    }

    navigateToLogin(): void {
        void this._router.navigate([`${AUTH_ROUTES.AUTH_WORKFLOW}/${AUTH_ROUTES.LOGIN}`]);
    }
}
