import { ElementRef, Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class PxbFormsService {
    advanceToNextField(fieldToNavigateTo: ElementRef): void {
        fieldToNavigateTo.nativeElement.focus();
    }
}
