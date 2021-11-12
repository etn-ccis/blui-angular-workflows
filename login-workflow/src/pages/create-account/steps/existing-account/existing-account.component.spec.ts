import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BluiExistingAccountComponent } from './existing-account.component';
import { BluiCreateAccountStepsModule } from '../steps.module';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

describe('BluiExistingAccountComponent', () => {
    let component: BluiExistingAccountComponent;
    let fixture: ComponentFixture<BluiExistingAccountComponent>;

    beforeEach(() => {
        void TestBed.configureTestingModule({
            imports: [BluiCreateAccountStepsModule, RouterTestingModule],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(BluiExistingAccountComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        void expect(component).toBeTruthy();
    });

    it('should render "Account Created" in the title', () => {
        const titleEl = fixture.debugElement.query(By.css('.blui-auth-title'));
        void expect(titleEl.nativeElement.innerHTML).toBe('Account Created!');
    });
});
