import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class PxbAuthStateService {
    loggedIn: boolean;

    isAuthenticated(): boolean {
        return this.loggedIn;
    }

    setAuthenticated(loggedIn: boolean): void {
        this.loggedIn = loggedIn;
    }
}
