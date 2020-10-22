import { Component, Input } from '@angular/core';

@Component({
    selector: 'pxb-dot-stepper',
    templateUrl: './dot-stepper.component.html',
    styleUrls: ['./dot-stepper.component.scss'],
})
export class DotStepperComponent {
    @Input() steps: number;
    @Input() activeStepId = 0;
    stepsArray: number[] = [];

    constructor() {}

    ngOnInit(): void {
        this.stepsArray = Array(this.steps)
            .fill(0)
            .map((i) => i);
    }
}
