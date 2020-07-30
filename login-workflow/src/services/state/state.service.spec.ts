import { TestBed } from '@angular/core/testing';

import { PxbAuthStateService } from './state.service';

describe('PxbAuthStateService', () => {
    let service: PxbAuthStateService;

    beforeEach(() => {
        void TestBed.configureTestingModule({});
        service = TestBed.inject(PxbAuthStateService);
    });

    it('should be created', () => {
        void expect(service).toBeTruthy();
    });
});
