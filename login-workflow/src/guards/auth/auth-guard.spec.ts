import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { PxbAuthGuard } from './auth-guard';
import { PxbAuthSecurityService } from '../../services/state/auth-security.service';
import { Router } from '@angular/router';

describe('PxbAuthGuard', () => {
    let guard: PxbAuthGuard;
    let router: Router;
    let securityService: PxbAuthSecurityService;

    beforeEach(() => {
        void TestBed.configureTestingModule({
            imports: [RouterTestingModule],
        }).compileComponents();
    });

    beforeEach(() => {
        TestBed.configureTestingModule({});
        guard = TestBed.inject(PxbAuthGuard);
        router = TestBed.inject(Router);
        securityService = TestBed.inject(PxbAuthSecurityService);
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
