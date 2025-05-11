import { inject } from '@angular/core';
import { RenderMode, ServerRoute } from '@angular/ssr';
import { ProductService } from './services/product.service';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'products/:id',
    renderMode: RenderMode.Server,
    //getPrerenderParams: async () => {
    //  const productService = inject(ProductService);
    //  const ids = await productService.getIds();
    //  return ids.map((id) => ({ id: id.toString() }));
    //},
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
