import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PxbExistingAccountComponent } from './existing-account.component';
import { PxbCreateAccountStepsModule } from '../steps.module';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

describe('PxbExistingAccountComponent', () => {
    let component: PxbExistingAccountComponent;
    let fixture: ComponentFixture<PxbExistingAccountComponent>;

    beforeEach(() => {
        void TestBed.configureTestingModule({
            imports: [PxbCreateAccountStepsModule, RouterTestingModule],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(PxbExistingAccountComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        void expect(component).toBeTruthy();
    });

    it('should render "Account Created" in the title', () => {
        const titleEl = fixture.debugElement.query(By.css('.pxb-auth-title'));
        void expect(titleEl.nativeElement.innerHTML).toBe('Account Created');
    });
});
