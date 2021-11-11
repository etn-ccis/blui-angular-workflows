import { BluiAuthSecurityService } from './auth-security.service';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BluiAuthModule } from '../../auth.module';
import { AUTH_ROUTES } from '../../auth/auth.routes';
import { getAuthSubRoutes } from '../../auth/auth.routing';
import { Router } from '@angular/router';
import { BluiAuthComponent } from '../../auth/auth.component';

describe('BluiAuthSecurityService', () => {
    let securityService: BluiAuthSecurityService;
    const authWorkflowRoutes = getAuthSubRoutes();
    let router: Router;
    beforeEach(() => {
        void TestBed.configureTestingModule({
            imports: [
                BluiAuthModule,
                RouterTestingModule.withRoutes([
                    {
                        path: AUTH_ROUTES.AUTH_WORKFLOW,
                        component: BluiAuthComponent,
                        children: authWorkflowRoutes,
                    },
                    {
                        path: 'test',
                        component: BluiAuthComponent,
                    },
                ]),
            ],
        }).compileComponents();
        router = TestBed.inject(Router);
        securityService = TestBed.inject(BluiAuthSecurityService);
    });

    it('should listen for route changes and infer default home route when inferOnAuthenticatedRoute is called', async () => {
        await router.navigate(['auth/login']);
        void expect(AUTH_ROUTES.ON_AUTHENTICATED).toBe('');
        securityService.inferOnAuthenticatedRoute();
        const routerSpy = spyOn(router, 'navigate').and.returnValue(Promise.resolve(true));
        await router.navigate(['test']).then(() => {
            void expect(routerSpy).toHaveBeenCalledWith(['test']);
        });
    });

    it('should not remember the email if remember me is disabled', () => {
        securityService.updateSecurityState({
            rememberMeDetails: {
                email: 'test@gmail.com',
            },
        });
        securityService.onUserNotAuthenticated({
            user: undefined,
            rememberMe: false,
        });
        void expect(securityService.getSecurityState().email).toBe(undefined);
    });
});
