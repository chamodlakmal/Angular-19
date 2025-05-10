import { Component } from '@angular/core';
import { HttpCacheComponent } from './http-cache/http-cache.component';
import { ServerCompatibleComponent } from './server-compatible/server-compatible.component';

@Component({
  selector: 'app-root',
  imports: [HttpCacheComponent, ServerCompatibleComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'ssr-example';
}
