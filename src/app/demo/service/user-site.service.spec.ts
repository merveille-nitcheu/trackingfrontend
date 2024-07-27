import { TestBed } from '@angular/core/testing';

import { UserSiteService } from './user-site.service';

describe('UserSiteService', () => {
  let service: UserSiteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserSiteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
