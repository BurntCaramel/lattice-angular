import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LatticeTableComponent } from './lattice-table.component';

describe('LatticeTableComponent', () => {
  let component: LatticeTableComponent;
  let fixture: ComponentFixture<LatticeTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LatticeTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LatticeTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
