import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PxbCreateAccountComponent } from './create-account.component';
import { RouterTestingModule } from '@angular/router/testing';
import { PXB_AUTH_CONFIG } from '../../config/auth-config';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('CreateAccountComponent', () => {
    let component: PxbCreateAccountComponent;
    let fixture: ComponentFixture<PxbCreateAccountComponent>;

    beforeEach(async(() => {
        void TestBed.configureTestingModule({
            imports: [RouterTestingModule, ReactiveFormsModule, FormsModule],
            declarations: [PxbCreateAccountComponent],
            providers: [{ provide: PXB_AUTH_CONFIG, useValue: PXB_AUTH_CONFIG }],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PxbCreateAccountComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        void expect(component).toBeTruthy();
    });
});
