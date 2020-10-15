import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PxbLoginComponent } from './login.component';
import { RouterTestingModule } from '@angular/router/testing';
import { PXB_AUTH_CONFIG } from '../../config/auth-config';

describe('LoginComponent', () => {
    let component: PxbLoginComponent;
    let fixture: ComponentFixture<PxbLoginComponent>;

    beforeEach(async(() => {
        void TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            declarations: [PxbLoginComponent],
            providers: [{ provide: PXB_AUTH_CONFIG, useValue: PXB_AUTH_CONFIG }],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PxbLoginComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        void expect(component).toBeTruthy();
    });
});
