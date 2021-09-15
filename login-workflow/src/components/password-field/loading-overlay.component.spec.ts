import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { PxbCommonComponentsModule } from '../auth-common.module';
import { PasswordFieldComponent } from './password-field.component';

describe(' PasswordFieldComponent', () => {
    let component: PasswordFieldComponent;
    let fixture: ComponentFixture<PasswordFieldComponent>;

    beforeEach(() => {
        void TestBed.configureTestingModule({
            imports: [PxbCommonComponentsModule, RouterTestingModule],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(PasswordFieldComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        void expect(component).toBeTruthy();
    });
});
