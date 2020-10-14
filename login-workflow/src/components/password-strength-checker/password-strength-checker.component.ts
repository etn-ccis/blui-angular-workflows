import { Component, Input } from '@angular/core';
import * as Colors from '@pxblue/colors';

@Component({
    selector: 'app-password-strength-check',
    template: `
        <mat-list-item style="height: auto;">
            <mat-icon [style.color]="success ? Colors.blue[500] : Colors.gray[300]">{{ icon }}</mat-icon>
            <span
                class="validation-message mat-subheading-1"
                [style.color]="success ? Colors.gray[300] : Colors.black[500]"
            >
                {{ validationMessage }}
            </span>
        </mat-list-item>
    `,
    styles: [
        `
            ::ng-deep .mat-list-base .mat-list-item .mat-list-item-content {
                padding: 0;
            }

            .validation-message {
                padding-left: 8px;
                font-weight: 400;
                line-height: 1.2;
            }
        `,
    ],
})
export class PasswordStrengthCheckComponent {
    @Input() icon = 'done';
    @Input() validationMessage: string;
    @Input() success = false;
    Colors = Colors;

    constructor() {}
}
