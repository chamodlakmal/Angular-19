import { PrerenderFallback, RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'product/:id',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => {
      return [{ id: '1' }, { id: '2' }, { id: '5' }];
    },
    fallback: PrerenderFallback.None,
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
