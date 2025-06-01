import { Component, linkedSignal, signal } from '@angular/core';

@Component({
  selector: 'app-linked-signal-demo',
  imports: [],
  templateUrl: './linked-signal-demo.component.html',
  styleUrl: './linked-signal-demo.component.css',
})
export class LinkedSignalDemoComponent {
  source = signal(0);
  linked = linkedSignal(() => this.source() * 2);

  setSource() {
    this.source.set(this.source() + 1);
  }

  setLinked() {
    this.linked.set(100);
  }
}
