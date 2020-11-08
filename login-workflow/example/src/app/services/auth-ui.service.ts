import { Injectable } from '@angular/core';
import { IPxbAuthUIActionsService, PxbSecurityService } from '@pxblue/angular-auth-workflow';
import { LocalStorageService } from './localStorage.service';

const sleep = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms));
@Injectable({
    providedIn: 'root',
})
export class AuthUIService implements IPxbAuthUIActionsService {

  constructor(
    private readonly _localStorageService: LocalStorageService,
    private readonly _securityService: PxbSecurityService
  ) {
  }

  /**
   * Initialize the application security state. This will involve reading any local storage,
   * validating existing credentials (token expiration, for example). At the end of validation,
   * the [[SecurityUiService]] should be called with either:
   * [[onUserAuthenticated]] (which will present the application), or
   * [[onUserNotAuthenticated]] (which will present the Auth UI).
   *
   * Note: Until this method returns, the applications Splash screen will be presented.
   *
   * @returns Should always resolve. Never throw.
   */

  async initiateSecurity(): Promise<any> {
    let authData;

    try {
      await sleep(2000);
      authData = await this._localStorageService.readAuthData();
    } catch (e) {
      // Restoring token failed
    }

    // After restoring token, we may need to validate it in production apps
    // This will switch to the App screen or Auth screen.
    // PxbSecurityApiService.onUserAuthenticated()
    if (authData?.email !== undefined) {
      // @TODO: remove this later
      // eslint-disable-next-line no-console
      console.log('we have an email in local storage!', authData);
      this._securityService.onUserAuthenticated(authData?.email, authData?.userId, authData?.rememberMeData.rememberMe);
    } else {
      // @TODO: remove this later
      // eslint-disable-next-line no-console
      console.log('we have no email in local storage!', authData);

      const rememberMeEmail = authData?.rememberMeData.rememberMe ? authData?.rememberMeData.user : undefined;
     // this._securityService.onUserNotAuthenticated(false, rememberMeEmail, authData?.rememberMeData);
    }
  }

  async login(email: string, password: string, rememberMe: boolean): Promise<void> {
    console.log(`Performing a sample Login with the following credentials:\n  email: ${email} \n  password: ${password} \n  rememberMe: ${rememberMe}`);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (password === 'fail') {
          return reject('The Login API request has failed.');
        }
        return resolve();
      }, 1500);
    });
  }

  async forgotPassword(email: string): Promise<void> {
    console.log(`Performing a sample ForgotPassword request with the following credentials:\n email: ${email}`);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email === 'fail@test.com') {
          return reject('The ForgotPassword API request has failed.');
        }
        return resolve();
      }, 1000);
    });
  }

  async changePassword(oldPassword: string, newPassword: string): Promise<void> {
    console.log(`Performing a sample ChangePassword request with the following credentials.\n  oldPassword: ${oldPassword}\n  newPassword: ${newPassword}`);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (newPassword === 'fail') {
          return reject('The ChangePassword API request has failed.');
        }
        return resolve();
      }, 1000);
    });
  }

  async setPassword(code: string, password: string, email?: string): Promise<void> {
    console.log(`Performing a sample SetPassword request with the following credentials.\n  code: ${code}\n  password: ${password}\n  email: ${email}`);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (password === 'fail') {
          return reject('The SetPassword API request has failed.');
        }
        return resolve();
      }, 1000);
    });
  }
}
