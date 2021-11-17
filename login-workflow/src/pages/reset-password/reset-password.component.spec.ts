import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BluiAuthModule } from '../../auth.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BluiResetPasswordComponent } from './reset-password.component';
import { BluiAuthUIService } from '../../services/api/auth-ui/auth-ui.service';

describe('BluiResetPasswordComponent', () => {
    let component: BluiResetPasswordComponent;
    let fixture: ComponentFixture<BluiResetPasswordComponent>;

    beforeEach(() => {
        void TestBed.configureTestingModule({
            imports: [BluiAuthModule, RouterTestingModule, NoopAnimationsModule],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(BluiResetPasswordComponent);
        component = fixture.componentInstance;
        const uiService = TestBed.inject(BluiAuthUIService);
        spyOn(uiService, 'verifyResetCode').and.returnValue(Promise.resolve());
        fixture.detectChanges();
    });

    it('should create', () => {
        void expect(component).toBeTruthy();
    });
});
