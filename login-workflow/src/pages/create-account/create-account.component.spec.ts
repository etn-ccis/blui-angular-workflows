import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PxbCreateAccountComponent } from './create-account.component';
import { RouterTestingModule } from '@angular/router/testing';
import { PxbCreateAccountModule } from './create-account.module';
import {NoopAnimationsModule} from "@angular/platform-browser/animations";

describe('CreateAccountComponent', () => {
    let component: PxbCreateAccountComponent;
    let fixture: ComponentFixture<PxbCreateAccountComponent>;

    beforeEach(() => {
        void TestBed.configureTestingModule({
            imports: [RouterTestingModule, NoopAnimationsModule, PxbCreateAccountModule],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(PxbCreateAccountComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        void expect(component).toBeTruthy();
    });
});
