import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PxbCreateAccountStepsModule } from '../steps.module';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { PxbVerifyEmailComponent } from './verify-email.component';
import { MatDialogModule } from '@angular/material/dialog';

describe('PxbVerifyEmailComponent', () => {
    let component: PxbVerifyEmailComponent;
    let fixture: ComponentFixture<PxbVerifyEmailComponent>;

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
});
