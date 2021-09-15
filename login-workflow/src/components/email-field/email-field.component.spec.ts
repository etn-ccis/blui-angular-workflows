import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { PxbCommonComponentsModule } from '../auth-common.module';
import { EmailFieldComponent } from './email-field.component';

describe('EmailFieldComponent', () => {
    let component: EmailFieldComponent;
    let fixture: ComponentFixture<EmailFieldComponent>;

    beforeEach(() => {
        void TestBed.configureTestingModule({
            imports: [PxbCommonComponentsModule, RouterTestingModule],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(EmailFieldComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        void expect(component).toBeTruthy();
    });
});
