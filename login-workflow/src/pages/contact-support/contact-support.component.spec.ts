import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PxbContactSupportComponent } from './contact-support.component';

describe('ContactSupportComponent', () => {
    let component: PxbContactSupportComponent;
    let fixture: ComponentFixture<PxbContactSupportComponent>;

    beforeEach(async(() => {
        void TestBed.configureTestingModule({
            declarations: [PxbContactSupportComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PxbContactSupportComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        void expect(component).toBeTruthy();
    });
});
