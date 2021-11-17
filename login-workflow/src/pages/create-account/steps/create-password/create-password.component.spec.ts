import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BluiCreateAccountStepsModule } from '../steps.module';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { BluiCreatePasswordComponent } from './create-password.component';

describe('BluiCreatePasswordComponent', () => {
    let component: BluiCreatePasswordComponent;
    let fixture: ComponentFixture<BluiCreatePasswordComponent>;

    beforeEach(() => {
        void TestBed.configureTestingModule({
            imports: [BluiCreateAccountStepsModule, RouterTestingModule],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(BluiCreatePasswordComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        void expect(component).toBeTruthy();
    });

    it('should render "Create Password" in the title', () => {
        const titleEl = fixture.debugElement.query(By.css('.blui-auth-title'));
        void expect(titleEl.nativeElement.innerHTML).toBe('Create Password');
    });

    it('should emit an update event when password changes', () => {
        const emitSpy = spyOn(component.passwordChange, 'emit').and.stub();
        component.updatePassword('newPassword');
        void expect(emitSpy).toHaveBeenCalled();
    });
});
