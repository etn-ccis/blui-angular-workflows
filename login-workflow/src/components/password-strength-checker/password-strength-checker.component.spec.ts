import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { PxbCommonComponentsModule } from '../auth-common.module';
import { PasswordStrengthCheckComponent } from './password-strength-checker.component';

describe(' PasswordStrengthCheckComponent', () => {
    let component: PasswordStrengthCheckComponent;
    let fixture: ComponentFixture<PasswordStrengthCheckComponent>;

    beforeEach(() => {
        void TestBed.configureTestingModule({
            imports: [PxbCommonComponentsModule, RouterTestingModule],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(PasswordStrengthCheckComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        void expect(component).toBeTruthy();
    });
});
