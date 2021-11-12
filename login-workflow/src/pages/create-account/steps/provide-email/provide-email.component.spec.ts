import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BluiCreateAccountStepsModule } from '../steps.module';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { BluiProvideEmailComponent } from './provide-email.component';

describe('BluiProvideEmailComponent', () => {
    let component: BluiProvideEmailComponent;
    let fixture: ComponentFixture<BluiProvideEmailComponent>;

    beforeEach(() => {
        void TestBed.configureTestingModule({
            imports: [BluiCreateAccountStepsModule, RouterTestingModule],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(BluiProvideEmailComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        void expect(component).toBeTruthy();
    });

    it('should render "Create an Account" in the title', () => {
        const titleEl = fixture.debugElement.query(By.css('.blui-auth-title'));
        void expect(titleEl.nativeElement.innerHTML).toBe('Create an Account');
    });
});
