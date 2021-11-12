import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { BluiAuthGuard } from './auth-guard';
import { BluiAuthSecurityService } from '../../services/state/auth-security.service';
import { Router } from '@angular/router';

describe('BluiAuthGuard', () => {
    let guard: BluiAuthGuard;
    let router: Router;
    let securityService: BluiAuthSecurityService;

    beforeEach(() => {
        void TestBed.configureTestingModule({
            imports: [RouterTestingModule],
        }).compileComponents();
    });

    beforeEach(() => {
        TestBed.configureTestingModule({});
        guard = TestBed.inject(BluiAuthGuard);
        router = TestBed.inject(Router);
        securityService = TestBed.inject(BluiAuthSecurityService);
        spyOn(router, 'navigate').and.stub();
    });

    it('should be created', () => {
        void expect(guard).toBeTruthy();
    });

    it('should return false if the user is not authenticated', () => {
        securityService.updateSecurityState({ isAuthenticatedUser: false });
        void expect(guard.canActivate()).toBe(false);
    });

    it('should return true if the user is authenticated', () => {
        securityService.updateSecurityState({ isAuthenticatedUser: true });
        void expect(guard.canActivate()).toBe(true);
    });
});
