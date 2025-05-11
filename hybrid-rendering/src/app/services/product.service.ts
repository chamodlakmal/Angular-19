import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  getIds() {
    return [1, 2, 3, 4, 5];
  }
}
