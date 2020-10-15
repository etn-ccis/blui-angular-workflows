import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PxbContactSupportComponent } from './contact-support.component';
import { RouterTestingModule } from '@angular/router/testing';
import { PXB_AUTH_CONFIG } from '../../config/auth-config';

describe('ContactSupportComponent', () => {
    let component: PxbContactSupportComponent;
    let fixture: ComponentFixture<PxbContactSupportComponent>;

    beforeEach(async(() => {
        void TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            declarations: [PxbContactSupportComponent],
            providers: [{ provide: PXB_AUTH_CONFIG, useValue: PXB_AUTH_CONFIG }],
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
