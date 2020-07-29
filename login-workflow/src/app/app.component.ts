import { Component } from '@angular/core';
import { PxbLoginService } from './pages/login/login.service';

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
