import { Injectable } from '@angular/core';

export interface IPxbLoginService {
  // Returns if login was successful.
  login(): Promise<boolean>;
}

@Injectable({
  providedIn: 'root',
})
export class PxbLoginService implements IPxbLoginService {
  login(): Promise<boolean> {
    console.error('You need to provide your own PxbLoginService');
    return undefined;
  }
}
