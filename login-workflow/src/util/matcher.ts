import { ErrorStateMatcher } from '@angular/material/core';
import { FormControl, FormGroupDirective, NgForm } from '@angular/forms';

/** Error when invalid control is dirty, touched, or submitted. */
export class AuthErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        const isSubmitted = form && form.submitted;
        console.log(control);

        return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
    }
}
