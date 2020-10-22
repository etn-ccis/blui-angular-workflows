import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PxbCreateAccountInviteComponent } from './create-account-invite.component';
import { RouterTestingModule } from '@angular/router/testing';
import { PXB_AUTH_CONFIG } from '../../config/auth-config';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('CreateAccountInviteComponent', () => {
    let component: PxbCreateAccountInviteComponent;
    let fixture: ComponentFixture<PxbCreateAccountInviteComponent>;

    beforeEach(async(() => {
        void TestBed.configureTestingModule({
            imports: [RouterTestingModule, ReactiveFormsModule, FormsModule],
            declarations: [PxbCreateAccountInviteComponent],
            providers: [{ provide: PXB_AUTH_CONFIG, useValue: PXB_AUTH_CONFIG }],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PxbCreateAccountInviteComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        void expect(component).toBeTruthy();
    });
});
