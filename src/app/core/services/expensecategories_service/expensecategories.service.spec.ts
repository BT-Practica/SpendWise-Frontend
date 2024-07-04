import { TestBed } from '@angular/core/testing';

import { ExpensecategoriesService } from './expensecategories.service';

describe('ExpensecategoriesService', () => {
  let service: ExpensecategoriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExpensecategoriesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
