import { Component, Input } from '@angular/core';
import { PxbAuthSecurityService } from '../../../../services/state/auth-security.service';

@Component({
    selector: 'pxb-create-account-account-created-step',
    template: `
        <div class="mat-title pxb-auth-title">Account Created</div>
        <div class="pxb-auth-full-height" style="justify-content: center;">
            <pxb-empty-state
                class="pxb-account-created-empty-state"
                [title]="getSuccessEmptyStateTitle()"
                [description]="getSuccessEmptyStateDescription()"
            >
                <mat-icon pxb-empty-icon class="pxb-account-created-icon">check_circle</mat-icon>
            </pxb-empty-state>
        </div>
    `,
    styleUrls: ['./account-created.component.scss'],
})
export class PxbAccountCreatedComponent {
    @Input() userName: string;
    constructor(private readonly _pxbSecurityService: PxbAuthSecurityService) {}

    getSuccessEmptyStateTitle(): string {
        return `Welcome, ${this.userName}!`;
    }

    getSuccessEmptyStateDescription(): string {
        return `Your account has been successfully created with the email ${
            this._pxbSecurityService.getSecurityState().email
        }. Your account has already been added to the organization. Press Continue below to finish.`;
    }
}
