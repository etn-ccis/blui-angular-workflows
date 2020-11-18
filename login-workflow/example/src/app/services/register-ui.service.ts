/* eslint-disable no-console */
import {Injectable} from '@angular/core';
import {IPxbRegisterUIService, PxbAuthSecurityService} from '@pxblue/angular-auth-workflow';
import {NavigationEnd, Router} from "@angular/router";
import {SAMPLE_EULA} from "../constants/sampleEula";
import {last} from "rxjs/operators";

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
      const urlParams = new URLSearchParams(window.location.search);
      const registrationCode = urlParams.get('code');
      console.log(`Performing a sample ValidateUserRegistration request with the following credentials:\n code: ${registrationCode}`);
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (!registrationCode || registrationCode.toLowerCase() === 'fail') {
            return reject();
          }
          return resolve();
        }, 1000);
      });
    }

    loadEULA(): Promise<string> {
      console.log(`Performing a sample loadEULA request.`);
      return new Promise((resolve) => {
        setTimeout(() => {
          return resolve(SAMPLE_EULA);
        }, 500)
      });
    }

  completeRegistration(firstName: string, lastName: string, phoneNumber: string, password: string): Promise<void> {
    console.log(`Performing a sample CompleteRegistration request with the following credentials:\n firstName: ${firstName}\n lastName: ${lastName}\n phoneNumber: ${phoneNumber}\n password: ${password}`);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (firstName.toLowerCase() === 'fail' || lastName.toLowerCase() === 'fail') {
          return reject();
        }
        return resolve();
      }, 2000);
    });
  }
}
