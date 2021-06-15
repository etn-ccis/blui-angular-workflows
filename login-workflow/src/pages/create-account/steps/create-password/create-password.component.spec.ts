import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PxbCreateAccountStepsModule } from '../steps.module';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { PxbCreatePasswordComponent } from './create-password.component';

describe('PxbCreatePasswordComponent', () => {
    let component: PxbCreatePasswordComponent;
    let fixture: ComponentFixture<PxbCreatePasswordComponent>;

    beforeEach(() => {
        void TestBed.configureTestingModule({
            imports: [PxbCreateAccountStepsModule, RouterTestingModule],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(PxbCreatePasswordComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        void expect(component).toBeTruthy();
    });

    it('should render "Create Password" in the title', () => {
        const titleEl = fixture.debugElement.query(By.css('.pxb-auth-title'));
        void expect(titleEl.nativeElement.innerHTML).toBe('Create Password');
    });

    it('should emit an update event when password changes', () => {
        const emitSpy = spyOn(component.passwordChange, 'emit').and.stub();
        component.updatePassword('newPassword');
        void expect(emitSpy).toHaveBeenCalled();
    });
});
