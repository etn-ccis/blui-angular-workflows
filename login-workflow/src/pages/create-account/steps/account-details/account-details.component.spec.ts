import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BluiCreateAccountStepsModule } from '../steps.module';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { BluiAccountDetailsComponent } from './account-details.component';

describe('BluiAccountDetailsComponent', () => {
    let component: BluiAccountDetailsComponent;
    let fixture: ComponentFixture<BluiAccountDetailsComponent>;

    beforeEach(() => {
        void TestBed.configureTestingModule({
            imports: [BluiCreateAccountStepsModule, RouterTestingModule],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(BluiAccountDetailsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        void expect(component).toBeTruthy();
    });

    it('should render "Account Details" in the title', () => {
        const titleEl = fixture.debugElement.query(By.css('.blui-auth-title'));
        void expect(titleEl.nativeElement.innerHTML).toBe('Account Details');
    });
});
