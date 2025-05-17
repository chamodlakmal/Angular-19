import { Component, inject, OnInit, signal } from '@angular/core';
import { Product } from '../../../core/models/product.model';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProductService } from '../../../core/services/product.service';
import { CurrencyPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-product-detail',
  imports: [CurrencyPipe, DatePipe, RouterLink],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css',
})
export class ProductDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private productService = inject(ProductService);

  product = signal<Product | undefined>(undefined);

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.product.set(this.productService.getById(productId));
    }
  }

  onDelete() {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.delete(this.product()!.id);
      this.router.navigate(['/']);
    }
  }
}
