import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PxbAuthService } from '../../auth/auth.service';
import {IPxbLoginService, PxbLoginService} from './login.service.interface';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        const isSubmitted = form && form.submitted;
        return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
    }
}

@Component({
    selector: 'pxb-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class PxbLoginComponent implements OnInit {
    constructor(
        private readonly _loginService: PxbLoginService,
        private readonly _router: Router,
        private readonly _authService: PxbAuthService,
    ) {}

    emailFormControl = new FormControl('', [Validators.required, Validators.email]);
    passwordFormControl = new FormControl('', []);

    matcher = new MyErrorStateMatcher();
    isLoading: boolean;
    rememberMe: boolean;

    @Input() homeRoute: string;

    ngOnInit(): void {}

    login(): void {
        this.isLoading = true;
        this._loginService.login().then((success: boolean) => {
          this._authService.setAuthenticated(success);
          this.isLoading = false;
        }).catch(err => {
          this._authService.setAuthenticated(false);
          this.isLoading = false;
        });
    }

    forgotPassword(): void {
        this._router.navigate([this._authService.parentRoute + '/forgot-password']);
    }

    createAccount(): void {
        this._router.navigate([this._authService.parentRoute + '/create-account']);
    }
}
