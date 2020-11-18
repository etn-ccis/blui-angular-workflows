import { Component } from '@angular/core';

@Component({
    selector: 'pxb-auth-loading-overlay',
    template: `
        <div class="pxb-auth-loading-overlay"></div>
        <div class="pxb-auth-loading-spinner">
            <mat-spinner color="primary"></mat-spinner>
        </div>
    `,
    styleUrls: ['loading-overlay.component.scss'],
})
export class LoadingOverlayComponent {}
