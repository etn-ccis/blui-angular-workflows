import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'pxb-create-account-eula-step',
    template: `
        <div class="mat-title pxb-auth-title">License Agreement</div>
        <div class="pxb-auth-full-height" style="overflow: auto" (scroll)="checkScrollDistance($event)">{{ eula }}</div>
        <div class="pxb-eula-confirm-agreement">
            <mat-checkbox
                class="pxb-eula-checkbox"
                [disabled]="!userScrolledBottom"
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
            .pxb-eula-confirm-agreement {
                margin: 24px 0;
            }
            ::ng-deep .pxb-eula-checkbox .mat-checkbox-inner-container {
                width: 18px;
                height: 18px;
            }
        `,
    ],
})
export class PxbEulaComponent {
    @Input() eula: string;
    @Input() userAcceptsEula: boolean;
    @Output() userAcceptsEulaChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    userScrolledBottom = false;

    checkScrollDistance(e: Event): void {
        if (this.userScrolledBottom) {
            return;
        }
        const el = e.target as HTMLElement;
        this.userScrolledBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 1;
    }
}
