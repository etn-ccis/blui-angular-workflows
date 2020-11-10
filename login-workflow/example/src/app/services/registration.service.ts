import { Injectable } from '@angular/core';
import { IPxbRegistrationApiService } from '@pxblue/angular-auth-workflow';

@Injectable({
    providedIn: 'root',
})
export class RegistrationService implements IPxbRegistrationApiService {}
