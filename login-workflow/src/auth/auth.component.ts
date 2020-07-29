import { Component, OnInit } from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";
import {CREATE_ACCOUNT_ROUTE, FORGOT_PASSWORD_ROUTE, LOGIN_ROUTE, RESET_PASSWORD_ROUTE} from "./auth.routing";
import {PxbAuthService} from "./auth.service";

@Component({
    selector: 'pxb-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.css']
})
export class PxbAuthComponent implements OnInit {

    showLogin: boolean;
    showForgotPassword: boolean;
    showCreateAccount: boolean;
    showResetPassword: boolean;

    constructor(router: Router, private readonly _authService: PxbAuthService) {
      router.events.subscribe((route) => {
        if (route instanceof NavigationEnd) {
          console.log(route);
          this.resetSelectedRoute();
          this.showLogin = this.matches(route.url, LOGIN_ROUTE);
          this.showCreateAccount = this.matches(route.url, CREATE_ACCOUNT_ROUTE);
          this.showForgotPassword = this.matches(route.url, FORGOT_PASSWORD_ROUTE);
          this.showResetPassword = this.matches(route.url, RESET_PASSWORD_ROUTE);
        }
      });
    }

    ngOnInit(): void {}

    resetSelectedRoute(): void {
      this.showLogin = false;
      this.showForgotPassword = false;
      this.showCreateAccount = false;
      this.showResetPassword = false;
    }

  matches(currendRoute: string, targetRoute: string): boolean {
      return currendRoute === '/' + this._authService.parentRoute + '/' + targetRoute;
  }
}
