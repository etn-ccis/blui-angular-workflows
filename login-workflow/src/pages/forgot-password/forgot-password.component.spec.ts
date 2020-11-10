import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PxbForgotPasswordComponent } from './forgot-password.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('ChangePasswordComponent', () => {
    let component: PxbForgotPasswordComponent;
    let fixture: ComponentFixture<PxbForgotPasswordComponent>;

    beforeEach(async(() => {
        void TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            declarations: [PxbForgotPasswordComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PxbForgotPasswordComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        void expect(component).toBeTruthy();
    });
});
