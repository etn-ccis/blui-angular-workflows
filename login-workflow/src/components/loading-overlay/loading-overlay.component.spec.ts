import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BluiCommonComponentsModule } from '../auth-common.module';
import { RouterTestingModule } from '@angular/router/testing';
import { LoadingOverlayComponent } from './loading-overlay.component';

describe('LoadingOverlayComponent', () => {
    let component: LoadingOverlayComponent;
    let fixture: ComponentFixture<LoadingOverlayComponent>;

    beforeEach(() => {
        void TestBed.configureTestingModule({
            imports: [BluiCommonComponentsModule, RouterTestingModule],
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
