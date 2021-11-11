import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BluiChangePasswordComponent } from './change-password.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BluiAuthModule } from '../../auth.module';

describe('BluiChangePasswordComponent', () => {
    let component: BluiChangePasswordComponent;
    let fixture: ComponentFixture<BluiChangePasswordComponent>;

    beforeEach(() => {
        void TestBed.configureTestingModule({
            imports: [BluiAuthModule, RouterTestingModule, NoopAnimationsModule],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(BluiChangePasswordComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        void expect(component).toBeTruthy();
    });
});
