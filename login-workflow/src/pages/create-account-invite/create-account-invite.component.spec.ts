import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PxbCreateAccountInviteComponent } from './create-account-invite.component';

describe('CreateAccountComponent', () => {
    let component: PxbCreateAccountInviteComponent;
    let fixture: ComponentFixture<PxbCreateAccountInviteComponent>;

    beforeEach(async(() => {
        void TestBed.configureTestingModule({
            declarations: [PxbCreateAccountInviteComponent],
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
