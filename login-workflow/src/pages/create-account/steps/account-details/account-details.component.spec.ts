import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PxbCreateAccountStepsModule } from '../steps.module';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { PxbAccountDetailsComponent } from './account-details.component';

describe('PxbAccountDetailsComponent', () => {
    let component: PxbAccountDetailsComponent;
    let fixture: ComponentFixture<PxbAccountDetailsComponent>;

    beforeEach(() => {
        void TestBed.configureTestingModule({
            imports: [PxbCreateAccountStepsModule, RouterTestingModule],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(PxbAccountDetailsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        void expect(component).toBeTruthy();
    });

    it('should render "Account Details" in the title', () => {
        const titleEl = fixture.debugElement.query(By.css('.pxb-auth-title'));
        void expect(titleEl.nativeElement.innerHTML).toBe('Account Details');
    });
});
