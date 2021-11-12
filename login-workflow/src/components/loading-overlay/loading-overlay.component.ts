import { Component, Input } from '@angular/core';

@Component({
    selector: 'blui-auth-loading-overlay',
    template: `
        <div class="blui-auth-loading-overlay"></div>
        <div class="blui-auth-loading-spinner">
            <mat-spinner color="primary"></mat-spinner>
            <h2 *ngIf="loadingMessage" class="blui-auth-loading-message mat-title">
                {{ loadingMessage }}
            </h2>
        </div>
    `,
    styleUrls: ['loading-overlay.component.scss'],
})
export class LoadingOverlayComponent {
    @Input() loadingMessage: string;
}
