import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PxbCreateAccountComponent } from './create-account.component';
import { RouterTestingModule } from '@angular/router/testing';
import { PxbCreateAccountModule } from './create-account.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { PxbRegisterUIService } from '../../services/api';

describe('CreateAccountComponent', () => {
    let component: PxbCreateAccountComponent;
    let registrationService: PxbRegisterUIService;
    let fixture: ComponentFixture<PxbCreateAccountComponent>;

    beforeEach(() => {
        void TestBed.configureTestingModule({
            imports: [RouterTestingModule, NoopAnimationsModule, PxbCreateAccountModule],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(PxbCreateAccountComponent);
        component = fixture.componentInstance;
        registrationService = TestBed.inject(PxbRegisterUIService);
        spyOn(registrationService, 'loadEULA').and.returnValue(Promise.resolve('EULA'));
        fixture.detectChanges();
    });

    it('should create', () => {
        void expect(component).toBeTruthy();
    });

    it('should validate user registration request', () => {
        const service = TestBed.inject(PxbRegisterUIService);
        const serviceSpy = spyOn(service, 'validateUserRegistrationRequest').and.returnValue(Promise.resolve(true));
        component.validateVerificationCode();
        void expect(serviceSpy).toHaveBeenCalled();
    });

    it('should complete registration', () => {
        const service = TestBed.inject(PxbRegisterUIService);
        const serviceSpy = spyOn(service, 'completeRegistration').and.returnValue(Promise.resolve());
        component.registerAccount();
        void expect(serviceSpy).toHaveBeenCalled();
    });

    it('should format the user name correctly', () => {
        component.firstName = 'Test';
        component.lastName = 'Name';
        void expect(component.getUserName()).toEqual('Test Name');
    });
});
