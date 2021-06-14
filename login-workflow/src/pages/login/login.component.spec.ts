import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PxbLoginComponent } from './login.component';
import { RouterTestingModule } from '@angular/router/testing';
import { PxbAuthModule } from '../../auth.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { PxbAuthSecurityService } from '../../services/state/auth-security.service';
import { PxbAuthUIService } from '../../services/api';
import { PxbAuthConfig } from '../../services/config/auth-config';

describe('LoginComponent', () => {
    let component: PxbLoginComponent;
    let router: Router;
    let authConfig: PxbAuthConfig;
    let securityService: PxbAuthSecurityService;
    let uiActionService: PxbAuthUIService;
    let fixture: ComponentFixture<PxbLoginComponent>;

    beforeEach(() => {
        void TestBed.configureTestingModule({
            imports: [PxbAuthModule, RouterTestingModule, NoopAnimationsModule],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(PxbLoginComponent);
        component = fixture.componentInstance;
        router = TestBed.inject(Router);
        securityService = TestBed.inject(PxbAuthSecurityService);
        uiActionService = TestBed.inject(PxbAuthUIService);
        authConfig = TestBed.inject(PxbAuthConfig);
    });

    it('should create', () => {
        fixture.detectChanges();
        void expect(component).toBeTruthy();
    });

    it('should navigate you to default the default route if user is authenticated on load', () => {
        securityService.updateSecurityState({ isAuthenticatedUser: true });
        const navSpy = spyOn(component, 'navigateToDefaultRoute').and.stub();
        fixture.detectChanges();
        void expect(navSpy).toHaveBeenCalledTimes(1);
    });

    it('should call the login fn', (done) => {
        const loginSpy = spyOn(uiActionService, 'login').and.returnValue(Promise.resolve());
        fixture.detectChanges();
        component.login();
        fixture.detectChanges();
        void fixture.whenStable().then(() => {
            void expect(loginSpy).toHaveBeenCalledTimes(1);
            done();
        });
    });

    it('should enable debug mode', () => {
        component.debugMode = false;
        authConfig.allowDebugMode = true;
        fixture.detectChanges();
        const debugEl = fixture.nativeElement.querySelector('.pxb-login-debug-button');
        debugEl.click();
        void expect(component.debugMode).toBe(true);
    });

    it('should navigate user to forgot password page', () => {
        component.debugMode = true;
        fixture.detectChanges();
        const navSpy = spyOn(router, 'navigate');
        const forgotPasswordLink = fixture.nativeElement.querySelector('#pxb-forgot-password-link');
        forgotPasswordLink.click();
        void expect(navSpy).toHaveBeenCalledWith(['auth/forgot-password']);
    });

    it('should navigate user to create account via invite page', () => {
        component.debugMode = true;
        fixture.detectChanges();
        const navSpy = spyOn(router, 'navigate');
        const createAccountLink = fixture.nativeElement.querySelector('#pxb-create-account-invite-link');
        createAccountLink.click();
        void expect(navSpy).toHaveBeenCalledWith(['auth/register/invite'], {
            queryParams: {
                code: 'DEADBEEF',
            },
        });
    });

    it('should navigate user to create account', () => {
        component.debugMode = true;
        fixture.detectChanges();
        const navSpy = spyOn(router, 'navigate');
        const createAccountLink = fixture.nativeElement.querySelector('#pxb-create-account-link');
        createAccountLink.click();
        void expect(navSpy).toHaveBeenCalledWith(['auth/register/create-account']);
    });

    it('should navigate user to reset password page', () => {
        component.debugMode = true;
        fixture.detectChanges();
        const navSpy = spyOn(router, 'navigate');
        const resetLink = fixture.nativeElement.querySelector('#pxb-reset-password-link');
        resetLink.click();
        void expect(navSpy).toHaveBeenCalledWith(['auth/reset-password'], {
            queryParams: {
                code: 'DEADBEEF',
                email: 'resetPassword@email.com',
            },
        });
    });
});
