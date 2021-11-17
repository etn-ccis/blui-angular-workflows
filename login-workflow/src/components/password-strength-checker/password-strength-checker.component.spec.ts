import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BluiCommonComponentsModule } from '../auth-common.module';
import { PasswordStrengthCheckComponent } from './password-strength-checker.component';

describe(' PasswordStrengthCheckComponent', () => {
    let component: PasswordStrengthCheckComponent;
    let fixture: ComponentFixture<PasswordStrengthCheckComponent>;

    beforeEach(() => {
        void TestBed.configureTestingModule({
            imports: [BluiCommonComponentsModule, RouterTestingModule],
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
