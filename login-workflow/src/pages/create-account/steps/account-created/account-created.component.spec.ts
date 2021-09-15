import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PxbAccountCreatedComponent } from './account-created.component';
import { PxbCreateAccountStepsModule } from '../steps.module';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

describe('PxbAccountCreatedComponent', () => {
    let component: PxbAccountCreatedComponent;
    let fixture: ComponentFixture<PxbAccountCreatedComponent>;

    beforeEach(() => {
        void TestBed.configureTestingModule({
            imports: [PxbCreateAccountStepsModule, RouterTestingModule],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(PxbAccountCreatedComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        void expect(component).toBeTruthy();
    });

    it('should render "Account Created" in the title', () => {
        const titleEl = fixture.debugElement.query(By.css('.pxb-auth-title'));
        void expect(titleEl.nativeElement.innerHTML).toBe('Account Created!');
    });
});
