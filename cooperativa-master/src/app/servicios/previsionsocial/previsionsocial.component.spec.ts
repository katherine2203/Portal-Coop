import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrevisionsocialComponent } from './previsionsocial.component';

describe('PrevisionsocialComponent', () => {
  let component: PrevisionsocialComponent;
  let fixture: ComponentFixture<PrevisionsocialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrevisionsocialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrevisionsocialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
