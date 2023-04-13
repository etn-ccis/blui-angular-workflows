import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BluiCreateAccountStepsModule } from '../steps.module';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { BluiVerifyEmailComponent } from './verify-email.component';
import { MatDialogModule } from '@angular/material/dialog';
import { BluiRegisterUIService } from '../../../../services/api';

describe('BluiVerifyEmailComponent', () => {
    let component: BluiVerifyEmailComponent;
    let fixture: ComponentFixture<BluiVerifyEmailComponent>;
    let registerService: BluiRegisterUIService;

    beforeEach(() => {
        void TestBed.configureTestingModule({
            imports: [BluiCreateAccountStepsModule, MatDialogModule, RouterTestingModule],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(BluiVerifyEmailComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        void expect(component).toBeTruthy();
    });

    it('should render "Verify Email" in the title', () => {
        const titleEl = fixture.debugElement.query(By.css('.blui-auth-title'));
        void expect(titleEl.nativeElement.innerHTML).toBe('Verify Email');
    });

    it('should emit a new registration code', () => {
        const inputEl = fixture.debugElement.query(By.css('input')) as any;
        const updateCodeSpy = spyOn(component, 'updateCode').and.stub();
        inputEl.nativeElement.value = 'test';
        inputEl.nativeElement.dispatchEvent(new Event('input'));
        void expect(updateCodeSpy).toHaveBeenCalledWith('test');
    });

    it('should send verification email on button click', () => {
        registerService = TestBed.inject(BluiRegisterUIService);
        const verificationEmailSpy = spyOn(registerService, 'requestRegistrationCode').and.returnValue(
            Promise.resolve()
        );
        const button = fixture.nativeElement.querySelector('#blui-resend-button-link');
        button.click();
        void expect(verificationEmailSpy).toHaveBeenCalled();
    });
});
