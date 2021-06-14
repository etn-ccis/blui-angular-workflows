import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PxbCreateAccountInviteComponent } from './create-account-invite.component';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PxbAuthModule } from '../../auth.module';
import { PxbRegisterUIService } from '../../services/api';

describe('PxbCreateAccountInviteComponent', () => {
    let component: PxbCreateAccountInviteComponent;
    let fixture: ComponentFixture<PxbCreateAccountInviteComponent>;
    let registerService: PxbRegisterUIService;

    beforeEach(() => {
        void TestBed.configureTestingModule({
            imports: [PxbAuthModule, RouterTestingModule, ReactiveFormsModule, FormsModule],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(PxbCreateAccountInviteComponent);
        component = fixture.componentInstance;
        registerService = TestBed.inject(PxbRegisterUIService);
    });

    it('should create', () => {
        spyOn(component, 'validateRegistrationLink').and.stub();
        fixture.detectChanges();
        void expect(component).toBeTruthy();
    });

    it('should validate registration link on load', (done) => {
        const validateRegistrationLinkSpy = spyOn(registerService, 'validateUserRegistrationRequest').and.returnValue(
            Promise.resolve(false)
        );
        fixture.detectChanges();
        void fixture.whenStable().then(() => {
            void expect(validateRegistrationLinkSpy).toHaveBeenCalled();
            done();
        });
    });

    it('should register account', (done) => {
        spyOn(component, 'validateRegistrationLink').and.stub();
        const registerAccountSpy = spyOn(registerService, 'completeRegistration').and.returnValue(Promise.resolve());
        fixture.detectChanges();
        component.registerAccount();
        void fixture.whenStable().then(() => {
            void expect(registerAccountSpy).toHaveBeenCalled();
            done();
        });
    });

    describe('canContinue', () => {
        it('should return true when on account details page 1 and filled out first and last name', () => {
            spyOn(component, 'validateRegistrationLink').and.stub();
            fixture.detectChanges();
            spyOn(component.registrationUtils, 'isAccountDetailsPage').and.returnValue(true);
            spyOn(component.registrationUtils, 'isFirstAccountDetailsPage').and.returnValue(true);
            spyOn(component.registrationUtils, 'hasValidAccountDetails').and.returnValue(true);
            component.validAccountName = true;
            void expect(component.canContinue()).toBe(true);
            component.validAccountName = false;
            void expect(component.canContinue()).toBe(false);
        });

        it('should return false when on account details page 1 and filled out first and last name but also has custom account detail requirements', () => {
            spyOn(component, 'validateRegistrationLink').and.stub();
            fixture.detectChanges();
            spyOn(component.registrationUtils, 'isAccountDetailsPage').and.returnValue(true);
            spyOn(component.registrationUtils, 'isFirstAccountDetailsPage').and.returnValue(true);
            spyOn(component.registrationUtils, 'hasValidAccountDetails').and.returnValue(false);
            component.validAccountName = true;
            void expect(component.canContinue()).toBe(false);
        });

        it('should return true when on eula page and user accepted eula', () => {
            spyOn(component, 'validateRegistrationLink').and.stub();
            fixture.detectChanges();
            spyOn(component.registrationUtils, 'isAccountDetailsPage').and.returnValue(false);
            spyOn(component.registrationUtils, 'getCurrentPage').and.returnValue(0);
            component.userAcceptsEula = false;
            void expect(component.canContinue()).toBe(false);
            component.userAcceptsEula = true;
            void expect(component.canContinue()).toBe(true);
        });

        it('should return true on password page and meets password requirements', () => {
            spyOn(component, 'validateRegistrationLink').and.stub();
            fixture.detectChanges();
            spyOn(component.registrationUtils, 'isAccountDetailsPage').and.returnValue(false);
            spyOn(component.registrationUtils, 'getCurrentPage').and.returnValue(1);
            component.passwordMeetsRequirements = false;
            void expect(component.canContinue()).toBe(false);
            component.passwordMeetsRequirements = true;
            void expect(component.canContinue()).toBe(true);
        });
    });
});
