import { ElementRef, Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class PxbFormsService {
    advanceToNextField(fieldToNavigateTo: ElementRef): void {
        if (fieldToNavigateTo) {
            fieldToNavigateTo.nativeElement.focus();
        }
    }
}
