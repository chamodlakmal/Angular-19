import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectCount } from '../store/counter.selector';

@Component({
  selector: 'app-home',
  imports: [AsyncPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  private store = inject(Store);

  count$ = this.store.select(selectCount);
}
