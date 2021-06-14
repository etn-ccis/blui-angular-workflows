import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PxbForgotPasswordComponent } from './forgot-password.component';
import { RouterTestingModule } from '@angular/router/testing';
import { PxbAuthModule } from '../../auth.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { PxbAuthUIService } from '../../services/api';
import { Router } from '@angular/router';

describe('ForgotPasswordComponent', () => {
    let component: PxbForgotPasswordComponent;
    let fixture: ComponentFixture<PxbForgotPasswordComponent>;

    beforeEach(() => {
        void TestBed.configureTestingModule({
            imports: [PxbAuthModule, RouterTestingModule, NoopAnimationsModule],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(PxbForgotPasswordComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        void expect(component).toBeTruthy();
    });

    it('should send forgot password request on button click', (done) => {
        const authService = TestBed.inject(PxbAuthUIService);
        const router = TestBed.inject(Router);
        spyOn(router, 'navigate').and.stub();
        spyOn(component, 'hasValidEmail').and.returnValue(true);
        fixture.detectChanges();

        const forgotPasswordSpy = spyOn(authService, 'forgotPassword').and.returnValue(Promise.resolve());
        const button = fixture.nativeElement.querySelector('#pxb-reset-button');
        button.click();
        fixture.detectChanges();
        void fixture.whenStable().then(() => {
            void expect(forgotPasswordSpy).toHaveBeenCalled();
            done();
        });
    });
});
