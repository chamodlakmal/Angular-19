import { Component, inject } from '@angular/core';
import { ProductService } from '../../../core/services/product.service';
import { AsyncPipe } from '@angular/common';
import { ProductItemComponent } from '../product-item/product-item.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-list',
  imports: [AsyncPipe, ProductItemComponent, RouterLink],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent {
  private productService = inject(ProductService);
  products$ = this.productService.products$;

  onDelete(productId: string) {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.delete(productId);
    }
  }
}
