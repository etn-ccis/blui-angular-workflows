import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PxbCreateAccountInviteComponent } from './create-account-invite.component';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PxbAuthModule } from '../../auth.module';

describe('CreateAccountInviteComponent', () => {
    let component: PxbCreateAccountInviteComponent;
    let fixture: ComponentFixture<PxbCreateAccountInviteComponent>;

    beforeEach(() => {
        void TestBed.configureTestingModule({
            imports: [PxbAuthModule, RouterTestingModule, ReactiveFormsModule, FormsModule],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(PxbCreateAccountInviteComponent);
        component = fixture.componentInstance;
        spyOn(component, 'validateRegistrationLink').and.stub();
        fixture.detectChanges();
    });

    it('should create', () => {
        void expect(component).toBeTruthy();
    });
});
