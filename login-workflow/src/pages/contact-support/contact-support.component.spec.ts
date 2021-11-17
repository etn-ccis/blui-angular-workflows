import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BluiContactSupportComponent } from './contact-support.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('ContactSupportComponent', () => {
    let component: BluiContactSupportComponent;
    let fixture: ComponentFixture<BluiContactSupportComponent>;

    beforeEach(async(() => {
        void TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            declarations: [BluiContactSupportComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(BluiContactSupportComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        void expect(component).toBeTruthy();
    });
});
