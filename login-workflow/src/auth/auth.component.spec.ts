import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BluiAuthComponent } from './auth.component';
import { BluiAuthModule } from '../auth.module';
import { BluiAuthUIService } from '../services/api/auth-ui/auth-ui.service';
import { BluiAuthSecurityService } from '../services/state/auth-security.service';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AUTH_ROUTES } from './auth.routes';
import { getAuthSubRoutes } from './auth.routing';

describe('BluiAuthComponent', () => {
    let component: BluiAuthComponent;
    let fixture: ComponentFixture<BluiAuthComponent>;
    let securityService: BluiAuthSecurityService;
    let router: Router;
    const authWorkflowRoutes = getAuthSubRoutes();

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
                ]),
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(BluiAuthComponent);
        component = fixture.componentInstance;
        const uiService = TestBed.inject(BluiAuthUIService);
        securityService = TestBed.inject(BluiAuthSecurityService);
        router = TestBed.inject(Router);
        spyOn(uiService, 'initiateSecurity').and.returnValue(Promise.resolve());
        fixture.detectChanges();
    });

    it('should create', () => {
        void expect(component).toBeTruthy();
    });

    it('should respond to security state loading changes', () => {
        component.isLoading = false;
        void expect(component.isLoading).toBe(false);
        securityService.updateSecurityState({
            isLoading: true,
        });
        void expect(component.isLoading).toBe(true);
    });

    it('should conditionally show different sub-components on route changes', async () => {
        component.showLogin = true;
        component.isSecurityInitiated = true;
        fixture.detectChanges();
        let loginPage = fixture.debugElement.query(By.css('.blui-auth-login'));
        void expect(loginPage).toBeTruthy();

        await router.navigate([`${AUTH_ROUTES.AUTH_WORKFLOW}/${AUTH_ROUTES.CONTACT_SUPPORT}`]).then(() => {
            fixture.detectChanges();
            loginPage = fixture.debugElement.query(By.css('.blui-auth-login'));
            const contactSupportPage = fixture.debugElement.query(By.css('.blui-auth-contact-support'));

            void expect(loginPage).toBeFalsy();
            void expect(contactSupportPage).toBeTruthy();
        });
    });
});
