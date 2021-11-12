import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AUTH_ROUTES } from '../../auth/auth.routes';
import { BluiAuthConfig } from '../../services/config/auth-config';
import { isEmptyView } from '../../util/view-utils';
import { BluiAuthTranslations } from '../../translations/auth-translations';

@Component({
    selector: 'blui-contact-support',
    templateUrl: './contact-support.component.html',
    styleUrls: ['./contact-support.component.scss'],
    host: {
        class: 'blui-contact-support',
    },
})
export class BluiContactSupportComponent implements OnInit, AfterViewInit {
    @Input() instructions: string;

    @ViewChild('iconVC') iconEl: ElementRef;
    @ViewChild('instructionsVC') instructionsEl;

    isEmpty = (el: ElementRef): boolean => isEmptyView(el);
    translate: BluiAuthTranslations;

    constructor(
        private readonly _bluiAuthConfig: BluiAuthConfig,
        private readonly _router: Router,
        private readonly _changeDetectorRef: ChangeDetectorRef
    ) {}

    ngOnInit(): void {
        this.translate = this._bluiAuthConfig.getTranslations();
    }

    ngAfterViewInit(): void {
        this._changeDetectorRef.detectChanges();
    }

    getGeneralSupportDescription(): string {
        const email = this.translate.CONTACT_SUPPORT.EMAIL || this._bluiAuthConfig.contactEmail;
        return this.translate.CONTACT_SUPPORT.GENERAL_SUPPORT_DESCRIPTION(email);
    }

    getEmergencySupportDescription(): string {
        const phone = this.translate.CONTACT_SUPPORT.PHONE_NUMBER || this._bluiAuthConfig.contactPhone;
        return this.translate.CONTACT_SUPPORT.EMERGENCY_SUPPORT_DESCRIPTION(phone);
    }

    navigateToLogin(): void {
        void this._router.navigate([`${AUTH_ROUTES.AUTH_WORKFLOW}/${AUTH_ROUTES.LOGIN}`]);
    }
}
