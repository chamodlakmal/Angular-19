import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShippingMethodPickerComponent } from './shipping-method-picker.component';

describe('ShippingMethodPickerComponent', () => {
  let component: ShippingMethodPickerComponent;
  let fixture: ComponentFixture<ShippingMethodPickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShippingMethodPickerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShippingMethodPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
