import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { PxbChangePasswordComponent } from './change-password.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { PxbAuthModule } from '../../auth.module';

describe('PxbChangePasswordComponent', () => {
    let component: PxbChangePasswordComponent;
    let fixture: ComponentFixture<PxbChangePasswordComponent>;

    beforeEach(() => {
        void TestBed.configureTestingModule({
            imports: [PxbAuthModule, RouterTestingModule, NoopAnimationsModule],
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
