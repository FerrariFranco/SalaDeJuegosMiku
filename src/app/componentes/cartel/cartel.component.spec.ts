import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartelComponent } from './cartel.component';

describe('CartelComponent', () => {
  let component: CartelComponent;
  let fixture: ComponentFixture<CartelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
