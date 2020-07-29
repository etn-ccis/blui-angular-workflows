import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class PxbLoginService {
    private homeRoute: string;

    getHomeRoute(): string {
        return this.homeRoute;
    }

    setHomeRoute(route: string): void {
        this.homeRoute = route;
    }
}
