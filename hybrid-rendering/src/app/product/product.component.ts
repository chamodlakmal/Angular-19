import { AsyncPipe, JsonPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, switchMap } from 'rxjs';

@Component({
  selector: 'app-product',
  imports: [AsyncPipe, JsonPipe],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})
export class ProductComponent implements OnInit {
  http = inject(HttpClient);
  route = inject(ActivatedRoute);
  product$: Observable<Product> | null = null;

  ngOnInit(): void {
    this.product$ = this.route.params.pipe(
      switchMap((params) => {
        const id = params['id'];
        return this.http.get<Product>(
          `http://localhost:3001/api/products/${id}`
        );
      })
    );
  }
}

interface Product {
  id: string;
  title: string;
  description: string;
}
