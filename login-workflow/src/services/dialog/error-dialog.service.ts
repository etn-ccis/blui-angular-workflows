import { MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';

export type IBluiAuthErrorDialogService = {
    openDialog(data: ErrorDialogData): MatDialogRef<any>;
};

export type ErrorDialogData = {
    title: string;
    message: string;
};

export type LoginErrorData = ErrorDialogData & {
    mode?: Array<'dialog' | 'message-box' | 'form' | 'none'>;
    dismissible?: boolean;
    position?: 'top' | 'bottom';
};
