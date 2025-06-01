import { JsonPipe } from '@angular/common';
import { Component, linkedSignal, signal } from '@angular/core';

@Component({
  selector: 'app-shipping-method-picker',
  imports: [JsonPipe],
  templateUrl: './shipping-method-picker.component.html',
  styleUrl: './shipping-method-picker.component.css',
})
export class ShippingMethodPickerComponent {
  shippingOptions = signal<ShippingMethod[]>([
    { id: 1, name: 'Ground' },
    { id: 2, name: 'Air' },
    { id: 3, name: 'Sea' },
  ]);

  selectedOption = linkedSignal<ShippingMethod[], ShippingMethod>({
    source: this.shippingOptions,
    computation: (newOptions, previous) => {
      console.log('new options:', newOptions);
      console.log('previous option:', previous);

      return (
        newOptions.find((opt) => opt.id === previous?.value.id) ?? newOptions[0]
      );
    },
  });

  changeShipping(index: number) {
    this.selectedOption.set(this.shippingOptions()[index]);
  }

  changeShippingOptions() {
    this.shippingOptions.set([
      { id: 0, name: 'Email' },
      { id: 1, name: 'Ground' },
      { id: 2, name: 'Postal' },
    ]);
  }
}

interface ShippingMethod {
  id: number;
  name: string;
}
