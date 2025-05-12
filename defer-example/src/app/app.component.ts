import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LargeComponentComponent } from './large-component/large-component.component';
import { TriggerComponent } from './trigger/trigger.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    HomeComponent,
    LargeComponentComponent,
    TriggerComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'defer-example';

  deferTriggered = false;

  ngOnInit(): void {
    setTimeout(() => {
      this.deferTriggered = true;
    }, 3000);
  }
}
