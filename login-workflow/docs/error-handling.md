# Error Handling

The `@brightlayer-ui/angular-auth-workflow` allows for custom error handling.  

Each `BluiRegisterUIService` and `BluiAuthUIService` API call has a default error message that a user will see when an API call fails.  Each error message can be customized by rejecting a promise with an `ErrorDialogData` object, or by providing your own custom error dialog component. 

## Custom Error Title or Message

Rejecting an API call with an `ErrorDialogData` object allows for custom Dialog titles and message content to display.


### Usage

```
import { ErrorDialogData } from '@brightlayer-ui/angular-auth-workflow';
```

```
changePassword(oldPassword: string, newPassword: string): Promise<void> {
    return new Promise((resolve, reject) => {
        if (/*fail scenario*/)
            return reject({
                title: 'Error!',
                message: 'This is an example of a custom error message.',
            } as ErrorDialogData);
        }
        return resolve();
    }
}
```
### `ErrorDialogData` Properties

-   **message** (required): _`string`_
    -   Error dialog message
-   **title** (required): _`string`_
    -   Error dialog title


## Login Page Error Handling

The Login page has been enhanced to support multiple types of errors.  The `AuthUIService` `login` API call rejects with a `LoginErrorData` object that supports 3 error variants - `dialog`, `form`, and `message-box`. 

### Usage
```
import { LoginErrorData } from '@brightlayer-ui/angular-auth-workflow';
```
```
return reject({
    mode: ['form', 'dialog', 'message-box'],
    message: 'Custom login page error message'
} as LoginErrorData);

```

### `LoginErrorData` Properties

-   **dismissible** (optional): _`boolean`_
    -   When true, allows the `messsage-box` error variant to become dismissible.
    -   Default: true
-   **mode** (optional) _`Array<'dialog' | 'message-box', 'form', 'none'>`_
    -   Array of specified error variants used whenever a user fails to log in.
        -   `dialog` - A Dialog box overlay
        -   `form` - Error message will appear underneath the Login and Password form fields.
        -   `messsage-box` - A card that displays on the login page.
        -   `none` - Disables error state for failed login attempts.
    -   Default: `[dialog]`
-   **position** (optional): _`'top' | 'bottom'`_
    -   Controls where the `message-box` error variant is displayed. 


## Custom Error Content

In situations where a more complex error dialog is needed (e.g contains a link or images) users can use their own error dialog components.

The example project demos this feature for the login screen; whenever an error happens, we show a custom user-provided dialog component.

To provide your own dialog component, replace the default page-specific `ErrorDialogService` with your own service that will display your custom dialog.

```
// app.module.ts
import { BluiLoginErrorDialogService } from '@brightlayer-ui/angular-auth-workflow';
import { LoginErrorDialogService } from 'dialog/login-error-dialog.service';

providers: [
    {
        provide: BluiLoginErrorDialogService,
        useClass: LoginErrorDialogService,
    }
]
```

To enforce type-safety, your `ErrorDialogService` should implement `IBluiAuthErrorDialogService`.

```
import { IBluiAuthErrorDialogService } from '@brightlayer-ui/angular-auth-workflow';

@Injectable({
    providedIn: 'root',
})
export class LoginErrorDialogService implements IBluiAuthErrorDialogService {
    constructor(private dialog: MatDialog) {}
    openDialog(): MatDialogRef<[YourDialogComponent]> {
        return this.dialog.open([YourDialogComponent], {
            disableClose: false,
        });
    }
}
```

See the example project (`./src/app/dialog/login-error-dialog.component.ts`) for an example of a custom ErrorDialog component.
