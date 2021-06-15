import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PxbCommonComponentsModule } from '../auth-common.module';
import { RouterTestingModule } from '@angular/router/testing';
import { LoadingOverlayComponent } from './loading-overlay.component';

describe('LoadingOverlayComponent', () => {
    let component: LoadingOverlayComponent;
    let fixture: ComponentFixture<LoadingOverlayComponent>;

    beforeEach(() => {
        void TestBed.configureTestingModule({
            imports: [PxbCommonComponentsModule, RouterTestingModule],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(LoadingOverlayComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        void expect(component).toBeTruthy();
    });
});
