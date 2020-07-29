import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PxbAuthService } from '../../services/auth.service';
import { PxbLoginService } from './login.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class PxbLoginComponent implements OnInit {
    constructor(
        private readonly _login: PxbLoginService,
        private readonly _router: Router,
        private readonly _authService: PxbAuthService,
    ) {}

    @Input() homeRoute: string;

    ngOnInit(): void {}

    login(): void {
        this._authService.setAuthenticated(true);
        this._router.navigate([this._login.getHomeRoute()]);
    }

  forgotPassword(): void {
      this._router.navigate(['forgot-password']);
  }

  createAccount(): void {
      this._router.navigate(['create-account']);
  }
}
