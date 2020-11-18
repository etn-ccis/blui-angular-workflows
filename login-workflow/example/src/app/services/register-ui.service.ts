/* eslint-disable no-console */
import {Injectable} from '@angular/core';
import {IPxbRegisterUIService, PxbAuthSecurityService} from '@pxblue/angular-auth-workflow';
import {NavigationEnd, Router} from "@angular/router";

@Injectable({
    providedIn: 'root',
})
export class RegisterUIService implements IPxbRegisterUIService {

  currRoute: NavigationEnd;

    constructor(
      private readonly _router: Router,
      private readonly _pxbSecurityService: PxbAuthSecurityService
    ) {
      _router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          this.currRoute = event;
        }
      });
    }

    validateUserRegistrationRequest(): Promise<void> {
      console.log(this.currRoute);
      //  console.log(`Performing a sample ValidateUserRegistration request with the following credentials:\n email: ${email}`);
      return new Promise((resolve) => { // TODO: REJECT.
        setTimeout(() => {
          return resolve();
        }, 1000);
      });
    }

    loadEULA(): Promise<string> {
      return undefined;
    }

    completeRegistration(): Promise<void> {
      return undefined;
    }
}
