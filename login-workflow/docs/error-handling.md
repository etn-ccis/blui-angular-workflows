# Error Handling

The `@pxblue/angular-auth-workflow` allows for custom error handling.  

Each `PxbRegisterUIService` and `PxbAuthUIService` API call has a default error message that a user will see when an API call fails.  Each error message can be customized by rejecting a promise with an `ErrorDialogData` object, or by providing your own custom error dialog component. 

## Custom Error Title or Message

Rejecting an API call with an `ErrorDialogData` object allows for custom Dialog titles and message content to be display.

```
export type ErrorDialogData = {
    title: string;
    message: string;
}
```

```
changePassword(oldPassword: string, newPassword: string): Promise<void> {
    return new Promise((resolve, reject) => {
        if (/*fail scenario*/)
            return reject({
                title: 'Error!',
                message: 'This is an example of a custom error message.',
            });
        }
        return resolve();
    }
}
```


## Login Page Error Handling

The Login page has been enhanced to support multiple types of error content.  The `AuthUIService` `login` API call rejects with a `LoginErrorDialogData` object that supports 3 error variants - `dialog`, `form`, and `message-box`. 

```
import { LoginErrorDialogData } from '@pxblue/angular-auth-workflow';
```
```
return reject({
    mode: ['form', 'dialog', 'message-box'],
    message: 'Custom login page error message'
} as LoginErrorDialogData);

```
## Custom Error Content

In situations where a more complex error dialog is needed (e.g contains a link or images) users can use their own error dialog components.

The example project demos this feature for the login screen; whenever an error happens, we show a custom user-provided dialog component.

To provide your own dialog component, replace the default page-specific `ErrorDialogService` with your own service that will display your custom dialog.

```
// app.module.ts
import { PxbLoginErrorDialogService } from '@pxblue/angular-auth-workflow';
import { LoginErrorDialogService } from 'dialog/login-error-dialog.service';

providers: [
    {
        provide: PxbLoginErrorDialogService,
        useClass: LoginErrorDialogService,
    }
]
```

To enforce type-safety, your `ErrorDialogService` should implement `IPxbAuthErrorDialogService`.

```
import { IPxbAuthErrorDialogService } from '@pxblue/angular-auth-workflow';

@Injectable({
    providedIn: 'root',
})
export class LoginErrorDialogService implements IPxbAuthErrorDialogService {
    constructor(private dialog: MatDialog) {}
    openDialog(): MatDialogRef<[YourDialogComponent]> {
        return this.dialog.open([YourDialogComponent], {
            disableClose: false,
        });
    }
}
```

See the example project (`./src/app/dialog/login-error-dialog.component.ts`) for an example of a custom ErrorDialog component.
