import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpResourceComponent } from './http-resource/http-resource.component';
import { SwExampleComponent } from './sw-example/sw-example.component';
import { VehicleComponent } from './vehicle/vehicle.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    HttpResourceComponent,
    SwExampleComponent,
    VehicleComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'http-resource-example';
}
