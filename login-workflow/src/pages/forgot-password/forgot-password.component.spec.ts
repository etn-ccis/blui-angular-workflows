import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BluiForgotPasswordComponent } from './forgot-password.component';
import { RouterTestingModule } from '@angular/router/testing';
import { BluiAuthModule } from '../../auth.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BluiAuthUIService } from '../../services/api';
import { Router } from '@angular/router';

describe('ForgotPasswordComponent', () => {
    let component: BluiForgotPasswordComponent;
    let fixture: ComponentFixture<BluiForgotPasswordComponent>;

    beforeEach(() => {
        void TestBed.configureTestingModule({
            imports: [BluiAuthModule, RouterTestingModule, NoopAnimationsModule],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(BluiForgotPasswordComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        void expect(component).toBeTruthy();
    });

    it('should send forgot password request on button click', (done) => {
        const authService = TestBed.inject(BluiAuthUIService);
        const router = TestBed.inject(Router);
        spyOn(router, 'navigate').and.stub();
        spyOn(component, 'hasValidEmail').and.returnValue(true);
        fixture.detectChanges();

        const forgotPasswordSpy = spyOn(authService, 'forgotPassword').and.returnValue(Promise.resolve());
        const button = fixture.nativeElement.querySelector('#blui-reset-button');
        button.click();
        fixture.detectChanges();
        void fixture.whenStable().then(() => {
            void expect(forgotPasswordSpy).toHaveBeenCalled();
            done();
        });
    });
});
