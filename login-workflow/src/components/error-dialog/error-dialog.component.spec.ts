import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PxbCommonComponentsModule } from '../auth-common.module';
import { PxbAuthErrorDialogComponent } from './error-dialog.component';

describe('PxbAuthErrorDialogComponent', () => {
    let component: PxbAuthErrorDialogComponent;
    let fixture: ComponentFixture<PxbAuthErrorDialogComponent>;

    beforeEach(() => {
        void TestBed.configureTestingModule({
            imports: [PxbCommonComponentsModule, RouterTestingModule],
            providers: [
                { provide: MAT_DIALOG_DATA, useValue: {} },
                { provide: MatDialogRef, useValue: {} },
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(PxbAuthErrorDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        void expect(component).toBeTruthy();
    });
});
