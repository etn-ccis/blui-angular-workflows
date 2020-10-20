import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { PxbAuthGuard } from './auth-guard';

describe('AuthGuard', () => {
    let service: PxbAuthGuard;

    beforeEach(async(() => {
        void TestBed.configureTestingModule({
            imports: [RouterTestingModule]
        }).compileComponents();
    }));

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(PxbAuthGuard);
    });

    it('should be created', () => {
        void expect(service).toBeTruthy();
    });
});
