import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PxbLoginComponent } from './login.component';

describe('LoginComponent', () => {
    let component: PxbLoginComponent;
    let fixture: ComponentFixture<PxbLoginComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PxbLoginComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PxbLoginComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
