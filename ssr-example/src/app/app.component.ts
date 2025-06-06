import { Component } from '@angular/core';
import { HttpCacheComponent } from './http-cache/http-cache.component';
import { ServerCompatibleComponent } from './server-compatible/server-compatible.component';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'ssr-example';
}
