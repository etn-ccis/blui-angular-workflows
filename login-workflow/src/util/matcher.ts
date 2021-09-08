import { ErrorStateMatcher } from '@angular/material/core';
import { FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { AUTH_ROUTES } from '../auth/auth.routes';

/** Error when invalid control is touched, or submitted. */
export class AuthErrorStateMatcher implements ErrorStateMatcher {
    manualError: string;

    setManualError(err: string): void {
        this.manualError = err;
    }

    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        const isSubmitted = form && form.submitted;
        return Boolean(this.manualError) || !!(control && control.invalid && (control.touched || isSubmitted));
    }
}

export class ManualErrorStateMatch implements ErrorStateMatcher {
    isErrorState(): boolean {
        return true;
    }
}

export class CrossFieldErrorMatcher implements ErrorStateMatcher {
    manualError: string;

    setManualError(err: string): void {
        this.manualError = err;
    }

    isErrorState(control: FormControl | null): boolean {
        return Boolean(this.manualError) || ((control.touched || control.dirty) && control.invalid);
    }
}

// Returns true if a route (minus params) equals a target route
export const matchesRoute = (route: string, authRouteKey: keyof typeof AUTH_ROUTES): boolean => {
    const authRoute = `/${AUTH_ROUTES.AUTH_WORKFLOW}/${AUTH_ROUTES[authRouteKey]}`.replace('//', '/');
    const urlNoParams = route.split('?')[0];
    return urlNoParams === authRoute;
};
