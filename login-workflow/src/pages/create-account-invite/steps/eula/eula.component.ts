import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'pxb-create-account-eula-step',
    template: `
        <div class="mat-title pxb-auth-title">License Agreement</div>
        <div class="pxb-auth-full-height" style="overflow: auto">{{ eula }}</div>
        <div class="pxb-create-account-invite-confirm-agreement">
            <mat-checkbox
                class="pxb-create-account-invite-checkbox"
                [(ngModel)]="userAcceptsEula"
                (change)="userAcceptsEulaChange.emit(userAcceptsEula)"
                ngDefaultControl
            >
                I have read and agree to the Terms & Conditions
            </mat-checkbox>
        </div>
    `,
    styles: [
        `
            .pxb-create-account-invite-confirm-agreement {
                margin: 24px 0;
            }
        `,
    ],
})
export class PxbCreateAccountEulaComponent {
    @Input() eula: string;

    @Input() userAcceptsEula: boolean;
    @Output() userAcceptsEulaChange: EventEmitter<boolean> = new EventEmitter<boolean>();
}
