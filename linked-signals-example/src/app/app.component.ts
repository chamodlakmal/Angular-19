import { Component } from '@angular/core';
import { UserFormComponent } from './user-form/user-form.component';
import { ShippingMethodPickerComponent } from './shipping-method-picker/shipping-method-picker.component';
import { EqualityComponent } from './equality/equality.component';

@Component({
  selector: 'app-root',
  imports: [
    UserFormComponent,
    ShippingMethodPickerComponent,
    EqualityComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'linked-signals-example';
}
