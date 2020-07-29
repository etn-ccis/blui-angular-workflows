import { TestBed } from '@angular/core/testing';

import { PxbAuthService } from './auth.service';

describe('PxbAuthService', () => {
    let service: PxbAuthService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(PxbAuthService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
