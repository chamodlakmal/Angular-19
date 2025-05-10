import { Component } from '@angular/core';
import { HttpCacheComponent } from './http-cache/http-cache.component';

@Component({
  selector: 'app-root',
  imports: [HttpCacheComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'ssr-example';
}
