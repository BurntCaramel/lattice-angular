import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LatticeSheetComponent } from './lattice-sheet.component';

describe('LatticeSheetComponent', () => {
  let component: LatticeSheetComponent;
  let fixture: ComponentFixture<LatticeSheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LatticeSheetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LatticeSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
