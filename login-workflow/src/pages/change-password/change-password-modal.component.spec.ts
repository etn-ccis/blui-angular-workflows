import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PxbChangePasswordModalComponent } from './change-password-modal.component';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

describe('ChangePasswordModalComponent', () => {
    let component: PxbChangePasswordModalComponent;
    let fixture: ComponentFixture<PxbChangePasswordModalComponent>;

    beforeEach(async(() => {
        void TestBed.configureTestingModule({
            declarations: [PxbChangePasswordModalComponent],
            imports: [MatDialogModule],
            providers: [{ provide: MatDialogRef, useValue: {} }],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PxbChangePasswordModalComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        void expect(component).toBeTruthy();
    });
});
