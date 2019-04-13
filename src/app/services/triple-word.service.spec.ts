import { TestBed } from '@angular/core/testing';

import { TripleWordService } from './triple-word.service';

describe('TripleWordService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TripleWordService = TestBed.get(TripleWordService);
    expect(service).toBeTruthy();
  });
});
