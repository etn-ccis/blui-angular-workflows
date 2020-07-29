import { Component } from '@angular/core';
import { PxbLoginService } from '@pxblue/angular-auth-workflow';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    title = 'angular-auth-workflow';

    constructor(private readonly _loginService: PxbLoginService) {
        _loginService.setHomeRoute('home');
    }
}
