import { ElementRef } from '@angular/core';

function hasChildren(el: ElementRef): boolean {
    return el.nativeElement.children && el.nativeElement.children.length > 0;
}

export function isEmptyView(el: ElementRef): boolean {
    if (!el || !el.nativeElement) {
        return true;
    }
    return !hasChildren(el);
}
