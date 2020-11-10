import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { PxbChangePasswordComponent } from './change-password.component';

describe('ChangePasswordComponent', () => {
    let component: PxbChangePasswordComponent;
    let fixture: ComponentFixture<PxbChangePasswordComponent>;

    beforeEach(() => {
        void TestBed.configureTestingModule({
            imports: [RouterTestingModule, ReactiveFormsModule],
            declarations: [PxbChangePasswordComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(PxbChangePasswordComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        void expect(component).toBeTruthy();
    });
});
