import { httpResource } from '@angular/common/http';
import { Injectable, Signal } from '@angular/core';
import { VehicleResponse } from '../sw-example/sw-example.component';

@Injectable({
  providedIn: 'root',
})
export class VehicleService {
  private apiUrl = 'https://swapi.py4e.com/api/vehicles';
  getVehicles(searchTerm: Signal<string>) {
    return httpResource<VehicleResponse>(() =>
      searchTerm() ? `${this.apiUrl}?search=${searchTerm()}` : undefined
    );
  }
}
