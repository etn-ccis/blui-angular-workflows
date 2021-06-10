import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { PxbAuthModule } from '../../auth.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { PxbResetPasswordComponent } from './reset-password.component';
import { PxbAuthUIService } from '../../services/api/auth-ui/auth-ui.service';
import { PxbAuthSecurityService } from '../../services/state/auth-security.service';
import { Router } from '@angular/router';

describe('PxbResetPasswordComponent', () => {
    let component: PxbResetPasswordComponent;
    let fixture: ComponentFixture<PxbResetPasswordComponent>;

    beforeEach(() => {
        void TestBed.configureTestingModule({
            imports: [PxbAuthModule, RouterTestingModule, NoopAnimationsModule],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(PxbResetPasswordComponent);
        component = fixture.componentInstance;
        const uiService = TestBed.inject(PxbAuthUIService);
        spyOn(uiService, 'verifyResetCode').and.returnValue(Promise.resolve());
        fixture.detectChanges();
    });

    it('should create', () => {
        void expect(component).toBeTruthy();
    });
});
