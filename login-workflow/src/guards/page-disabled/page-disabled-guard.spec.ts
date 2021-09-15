import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { PxbAuthPageDisabledGuard } from './page-disabled-guard';

describe('PxbAuthPageDisabledGuard', () => {
    let service: PxbAuthPageDisabledGuard;

    beforeEach(() => {
        void TestBed.configureTestingModule({
            imports: [RouterTestingModule],
        }).compileComponents();
    });

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(PxbAuthPageDisabledGuard);
    });

    it('should be created', () => {
        void expect(service).toBeTruthy();
    });
});
