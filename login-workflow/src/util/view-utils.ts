import { ElementRef } from '@angular/core';

export function isEmptyView(el: ElementRef): boolean {
    return !el || !el.nativeElement || !el.nativeElement.children || el.nativeElement.children.length === 0;
}
