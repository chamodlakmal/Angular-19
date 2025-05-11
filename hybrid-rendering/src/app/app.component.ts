import { Component, inject, REQUEST, RESPONSE_INIT } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'hybrid-rendering';

  constructor() {
    //const request = inject(REQUEST);
    //if (request) {
    //  console.log('Server-side rendering');
    //  console.log(request);
    //} else {
    //  console.log('No Request');
    //}

    const response = inject(RESPONSE_INIT);

    if (response) {
      console.log('Server-side rendering');
      response.headers = {
        'X-Server-Header': 'Hello from the server',
      };
      response.status = 201;
    }
  }
}
