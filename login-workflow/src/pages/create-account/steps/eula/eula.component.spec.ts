import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BluiCreateAccountStepsModule } from '../steps.module';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { BluiEulaComponent } from './eula.component';
import { BluiAuthConfig } from '../../../../services/config/auth-config';
import { BluiRegisterUIService } from '../../../../services/api';

describe('BluiEulaComponent', () => {
    let component: BluiEulaComponent;
    let authConfig: BluiAuthConfig;
    let registerService: BluiRegisterUIService;
    let fixture: ComponentFixture<BluiEulaComponent>;

    beforeEach(() => {
        void TestBed.configureTestingModule({
            imports: [BluiCreateAccountStepsModule, RouterTestingModule],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(BluiEulaComponent);
        component = fixture.componentInstance;
        authConfig = TestBed.inject(BluiAuthConfig);
        registerService = TestBed.inject(BluiRegisterUIService);
    });

    it('should create', () => {
        spyOn(component, 'getEULA').and.stub();
        fixture.detectChanges();
        void expect(component).toBeTruthy();
    });

    it('should use the pre-loaded EULA if available', () => {
        const eulaLoadSpy = spyOn(registerService, 'loadEULA');
        authConfig.eula = 'pre-loaded eula';
        fixture.detectChanges();
        void expect(eulaLoadSpy).not.toHaveBeenCalled();
        void expect(component.eula).toBe(authConfig.eula);
    });

    it('should load the eula on init if not yet loaded', (done) => {
        const apiEULA = 'api eula';
        const eulaLoadSpy = spyOn(registerService, 'loadEULA').and.returnValue(Promise.resolve(apiEULA));
        authConfig.eula = undefined;
        fixture.detectChanges();
        void fixture.whenStable().then(() => {
            void expect(eulaLoadSpy).toHaveBeenCalledTimes(1);
            void expect(component.eula).toBe(apiEULA);
            done();
        });
    });

    it('should render "License Agreement" in the title', () => {
        spyOn(component, 'getEULA').and.stub();
        fixture.detectChanges();
        const titleEl = fixture.debugElement.query(By.css('.blui-auth-title'));
        void expect(titleEl.nativeElement.innerHTML).toBe('License Agreement');
    });

    describe('checkScrollDistance', () => {
        it('should mark user as scrolled bottom even if user has scrolled back up', () => {
            component.userScrolledBottom = true;
            const event: any = {
                target: {
                    scrollHeight: 100,
                    scrollTop: 0,
                    clientHeight: 10,
                },
            };
            component.checkScrollDistance(event);
            void expect(component.userScrolledBottom).toBe(true);
        });

        it('should mark user as scrolled bottom', () => {
            component.userScrolledBottom = false;
            const event: any = {
                target: {
                    scrollHeight: 100,
                    scrollTop: 100,
                    clientHeight: 10,
                },
            };
            component.checkScrollDistance(event);
            void expect(component.userScrolledBottom).toBe(true);
        });

        it('should not mark user as scrolled bottom', () => {
            component.userScrolledBottom = false;
            const event: any = {
                target: {
                    scrollHeight: 100,
                    scrollTop: 0,
                    clientHeight: 10,
                },
            };
            component.checkScrollDistance(event);
            void expect(component.userScrolledBottom).toBe(false);
        });
    });
});
