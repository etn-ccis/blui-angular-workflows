import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PxbCreateAccountStepsModule } from '../steps.module';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { PxbVerifyEmailComponent } from './verify-email.component';
import { MatDialogModule } from '@angular/material/dialog';
import { PxbRegisterUIService } from '../../../../services/api';

describe('PxbVerifyEmailComponent', () => {
    let component: PxbVerifyEmailComponent;
    let fixture: ComponentFixture<PxbVerifyEmailComponent>;
    let registerService: PxbRegisterUIService;

    beforeEach(() => {
        void TestBed.configureTestingModule({
            imports: [PxbCreateAccountStepsModule, MatDialogModule, RouterTestingModule],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(PxbVerifyEmailComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        void expect(component).toBeTruthy();
    });

    it('should render "Verify Email" in the title', () => {
        const titleEl = fixture.debugElement.query(By.css('.pxb-auth-title'));
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
        registerService = TestBed.inject(PxbRegisterUIService);
        const verificationEmailSpy = spyOn(registerService, 'requestRegistrationCode').and.returnValue(
            Promise.resolve()
        );
        const button = fixture.nativeElement.querySelector('button');
        button.click();
        void expect(verificationEmailSpy).toHaveBeenCalled();
    });
});
