import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TripleWordsPage } from './triple-words.page';

describe('TripleWordsPage', () => {
  let component: TripleWordsPage;
  let fixture: ComponentFixture<TripleWordsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TripleWordsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TripleWordsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
