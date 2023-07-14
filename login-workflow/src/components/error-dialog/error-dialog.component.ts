import { Component, Inject, OnInit } from '@angular/core';
import {
    MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA,
    MatLegacyDialogRef as MatDialogRef,
} from '@angular/material/legacy-dialog';
import { ErrorDialogData } from '../../services/dialog/error-dialog.service';

@Component({
    selector: 'blui-auth-error-dialog',
    template: `
        <div style="max-width: 552px">
            <div class="mat-h2">{{ title }}</div>
            <div class="mat-subheading-2">{{ message }}</div>
            <div style="display: flex; justify-content: flex-end; margin-top: 24px;">
                <button mat-button color="primary" (click)="dialogRef.close()">Okay</button>
            </div>
        </div>
    `,
})
export class BluiAuthErrorDialogComponent implements OnInit {
    // These are the defaults when no ErrorDialogData is provided by users or our ErrorDialogServices.
    title = 'Error!';
    message = 'Unable to process your request.';

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: ErrorDialogData,
        public dialogRef: MatDialogRef<BluiAuthErrorDialogComponent>
    ) {}

    // Use ErrorDialogData values if they are provided by an ErrorDialogService or directly from the user via a catch block.
    ngOnInit(): void {
        this.title = this.data?.title || this.title;
        this.message = this.data?.message || this.message;
    }
}
