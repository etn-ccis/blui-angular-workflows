import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BluiLoginComponent } from './login.component';
import { RouterTestingModule } from '@angular/router/testing';
import { BluiAuthModule } from '../../auth.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { BluiAuthSecurityService } from '../../services/state/auth-security.service';
import { BluiAuthUIService } from '../../services/api';
import { BluiAuthConfig } from '../../services/config/auth-config';

describe('LoginComponent', () => {
    let component: BluiLoginComponent;
    let router: Router;
    let authConfig: BluiAuthConfig;
    let securityService: BluiAuthSecurityService;
    let uiActionService: BluiAuthUIService;
    let fixture: ComponentFixture<BluiLoginComponent>;

    beforeEach(() => {
        void TestBed.configureTestingModule({
            imports: [BluiAuthModule, RouterTestingModule, NoopAnimationsModule],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(BluiLoginComponent);
        component = fixture.componentInstance;
        router = TestBed.inject(Router);
        securityService = TestBed.inject(BluiAuthSecurityService);
        uiActionService = TestBed.inject(BluiAuthUIService);
        authConfig = TestBed.inject(BluiAuthConfig);
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
        const debugEl = fixture.nativeElement.querySelector('.blui-login-debug-button');
        debugEl.click();
        void expect(component.debugMode).toBe(true);
    });

    it('should navigate user to forgot password page', () => {
        component.debugMode = true;
        fixture.detectChanges();
        const navSpy = spyOn(router, 'navigate');
        const forgotPasswordLink = fixture.nativeElement.querySelector('#blui-forgot-password-link');
        forgotPasswordLink.click();
        void expect(navSpy).toHaveBeenCalledWith(['auth/forgot-password']);
    });

    it('should navigate user to create account via invite page', () => {
        component.debugMode = true;
        fixture.detectChanges();
        const navSpy = spyOn(router, 'navigate');
        const createAccountLink = fixture.nativeElement.querySelector('#blui-create-account-invite-link');
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
        const createAccountLink = fixture.nativeElement.querySelector('#blui-create-account-link');
        createAccountLink.click();
        void expect(navSpy).toHaveBeenCalledWith(['auth/register/create-account']);
    });

    it('should navigate user to reset password page', () => {
        component.debugMode = true;
        fixture.detectChanges();
        const navSpy = spyOn(router, 'navigate');
        const resetLink = fixture.nativeElement.querySelector('#blui-reset-password-link');
        resetLink.click();
        void expect(navSpy).toHaveBeenCalledWith(['auth/reset-password'], {
            queryParams: {
                code: 'DEADBEEF',
                email: 'resetPassword@email.com',
            },
        });
    });
});
