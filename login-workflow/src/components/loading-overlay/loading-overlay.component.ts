import { Component, Input } from '@angular/core';

@Component({
    selector: 'pxb-auth-loading-overlay',
    template: `
        <div class="pxb-auth-loading-overlay"></div>
        <div class="pxb-auth-loading-spinner">
            <mat-spinner color="primary"></mat-spinner>
            <h2 *ngIf="loadingMessage" class="pxb-auth-loading-message mat-title">
                {{ loadingMessage }}
            </h2>
        </div>
    `,
    styleUrls: ['loading-overlay.component.scss'],
})
export class LoadingOverlayComponent {
    @Input() loadingMessage: string;
}
