import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BluiAuthPageDisabledGuard } from './page-disabled-guard';

describe('BluiAuthPageDisabledGuard', () => {
    let service: BluiAuthPageDisabledGuard;

    beforeEach(() => {
        void TestBed.configureTestingModule({
            imports: [RouterTestingModule],
        }).compileComponents();
    });

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(BluiAuthPageDisabledGuard);
    });

    it('should be created', () => {
        void expect(service).toBeTruthy();
    });
});
