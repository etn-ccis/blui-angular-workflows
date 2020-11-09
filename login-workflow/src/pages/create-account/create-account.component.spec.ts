import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PxbCreateAccountComponent } from './create-account.component';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('CreateAccountComponent', () => {
    let component: PxbCreateAccountComponent;
    let fixture: ComponentFixture<PxbCreateAccountComponent>;

    beforeEach(async(() => {
        void TestBed.configureTestingModule({
            imports: [RouterTestingModule, ReactiveFormsModule, FormsModule],
            declarations: [PxbCreateAccountComponent],
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
