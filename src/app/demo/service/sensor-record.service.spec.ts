import { TestBed } from '@angular/core/testing';

import { SensorRecordService } from './sensor-record.service';

describe('SensorRecordService', () => {
  let service: SensorRecordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SensorRecordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
