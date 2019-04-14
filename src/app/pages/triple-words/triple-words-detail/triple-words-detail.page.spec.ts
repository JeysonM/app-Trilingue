import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TripleWordsDetailPage } from './triple-words-detail.page';

describe('TripleWordsDetailPage', () => {
  let component: TripleWordsDetailPage;
  let fixture: ComponentFixture<TripleWordsDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TripleWordsDetailPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TripleWordsDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
