import { Component, Input } from '@angular/core';

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
    @Input() email;
    @Input() userName;

    getSuccessEmptyStateTitle(): string {
        if (this.userName && this.userName.trim()) {
            return `Welcome, ${this.userName}!`;
        }
        return `Welcome!`;
    }

    getSuccessEmptyStateDescription(): string {
        let firstSentence: string;
        if (this.email && this.email.trim()) {
            firstSentence = `Your account has been successfully created with the email ${this.email}.`;
        } else {
            firstSentence = `Your account has been successfully created.`;
        }
        return `${firstSentence} Your account has already been added to the organization. Press Continue below to finish.`;
    }
}
