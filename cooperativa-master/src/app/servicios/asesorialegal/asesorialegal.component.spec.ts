import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsesorialegalComponent } from './asesorialegal.component';

describe('AsesorialegalComponent', () => {
  let component: AsesorialegalComponent;
  let fixture: ComponentFixture<AsesorialegalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsesorialegalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsesorialegalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
