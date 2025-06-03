import { Component, computed, effect, inject, signal } from '@angular/core';
import { VehicleService } from '../services/vehicle.service';
import { Vehicle } from '../sw-example/sw-example.component';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-vehicle',
  imports: [JsonPipe],
  templateUrl: './vehicle.component.html',
  styleUrl: './vehicle.component.css',
})
export class VehicleComponent {
  vehicleService = inject(VehicleService);

  searchTerm = signal<string>('');

  vehiclesResource = this.vehicleService.getVehicles(this.searchTerm);

  vehicles = computed(
    () => this.vehiclesResource.value()?.results ?? ([] as Vehicle[])
  );

  eff = effect(() => {
    console.log('Vehicles Status: ', this.vehiclesResource.status());
    console.log('Vehicles Headers', this.vehiclesResource.headers());
    console.log('Error:', this.vehiclesResource.error());
  });

  onValueChanged(event: Event) {
    const target = event.target as HTMLInputElement;
    const searchTerm = target.value.trim();
    this.searchTerm.set(searchTerm);
  }
}
