import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectCount } from '../store/counter.selector';
import { AsyncPipe } from '@angular/common';
import {
  decrement,
  increment,
  incrementByAmount,
  reset,
} from '../store/counter.action';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-counter',
  imports: [AsyncPipe, FormsModule],
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.css',
})
export class CounterComponent {
  private store = inject(Store);

  count$ = this.store.select(selectCount);

  amount = 0;

  increment() {
    this.store.dispatch(increment());
  }

  decrement() {
    this.store.dispatch(decrement());
  }

  reset() {
    this.store.dispatch(reset());
  }

  incrementByAmount() {
    this.store.dispatch(incrementByAmount(+this.amount));
  }
}
