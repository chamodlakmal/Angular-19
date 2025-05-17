import { Injectable } from '@angular/core';
import { IStorageService } from '../interfaces/storage.interface';
import { Product } from '../models/product.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService implements IStorageService<Product> {
  private readonly STORAGE_KEY = 'products';
  private productSubject = new BehaviorSubject<Product[]>([]);
  products$ = this.productSubject.asObservable();

  constructor() {
    this.loadProductsFromStorage();
  }

  private loadProductsFromStorage(): void {
    const products = localStorage.getItem(this.STORAGE_KEY);
    if (products) {
      const parsedProducts = JSON.parse(products).map((product: Product) => ({
        ...product,
        createdAt: new Date(product.createdAt),
        updatedAt: new Date(product.updatedAt),
      }));
      this.productSubject.next(parsedProducts);
    }
  }

  private saveToLocalStorage(products: Product[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(products));
    this.productSubject.next(products);
  }

  getAll(): Product[] {
    return this.productSubject.getValue();
  }
  getById(id: string): Product | undefined {
    return this.productSubject.getValue().find((product) => product.id === id);
  }
  create(item: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): void {
    const newProduct = {
      ...item,
      id: crypto.randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const products = [...this.productSubject.getValue(), newProduct];
    this.saveToLocalStorage(products);
  }
  update(id: string, item: Product): void {
    const products = this.productSubject.getValue().map((product) =>
      product.id === id
        ? {
            ...product,
            ...item,
            updatedAt: new Date(),
          }
        : product
    );

    this.saveToLocalStorage(products);
  }
  delete(id: string): boolean {
    const products = this.productSubject
      .getValue()
      .filter((product) => product.id !== id);
    this.saveToLocalStorage(products);
    return true;
  }
}
