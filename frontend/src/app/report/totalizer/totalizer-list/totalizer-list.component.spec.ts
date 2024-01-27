/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TotalizerListComponent } from './totalizer-list.component';

describe('TotalizadorListComponent', () => {
  let component: TotalizerListComponent;
  let fixture: ComponentFixture<TotalizerListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TotalizerListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TotalizerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
