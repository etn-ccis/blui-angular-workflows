import { Component } from '@angular/core';

@Component({
    selector: 'app-auth',
    template: `
        <pxb-auth>
            <div pxb-login-header>Custom Login Page Header</div>
            <div pxb-login-footer>Custom Login Page Footer</div>
        </pxb-auth>
    `,
})
export class AuthComponent {
    constructor() {}
}
