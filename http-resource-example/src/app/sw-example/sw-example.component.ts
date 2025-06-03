import { JsonPipe } from '@angular/common';
import { HttpErrorResponse, httpResource } from '@angular/common/http';
import {
  Component,
  computed,
  effect,
  ResourceStatus,
  signal,
} from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { debounceTime } from 'rxjs';
import { debounceSignal } from '../utilities/debounce.util';
import { setErrorMessage } from '../utilities/erro-handle.util';

@Component({
  selector: 'app-sw-example',
  imports: [JsonPipe],
  templateUrl: './sw-example.component.html',
  styleUrl: './sw-example.component.css',
})
export class SwExampleComponent {
  private apiUrl = 'https://swapi.py4e.com/api/vehicles';

  private searchTermSignal = signal<string>('');
  searchText = debounceSignal(this.searchTermSignal, 400);

  //vehiclesResource = httpResource<VehicleResponse>(
  //  () => `${this.apiUrl}/?search=${this.searchText()}`
  //);
  vehiclesResource = httpResource<VehicleResponse>(() =>
    this.searchText()
      ? {
          url: this.apiUrl,
          method: 'GET',
          headers: {
            accept: 'application/json',
          },
          params: { search: this.searchText()! },
        }
      : undefined
  );

  vehicles = computed(
    () => this.vehiclesResource.value()?.results ?? ([] as Vehicle[])
  );

  eff = effect(() => {
    console.log(
      'Vehicles Status: ',
      ResourceStatus[this.vehiclesResource.status()]
    );
    //console.log('Vehicles Headers', this.vehiclesResource.headers());
    //console.log('Error:', this.vehiclesResource.error());
    setErrorMessage(this.vehiclesResource.error() as HttpErrorResponse);
  });

  onValueChanged(event: Event) {
    const target = event.target as HTMLInputElement;
    const searchTerm = target.value.trim();
    this.searchTermSignal.set(searchTerm);
  }
}

export interface VehicleResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Vehicle[];
}

export interface Vehicle {
  name: string;
  model: string;
  manufacturer: string;
}
