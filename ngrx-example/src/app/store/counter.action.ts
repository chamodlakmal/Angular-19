import { createAction } from '@ngrx/store';

export const increment = createAction('[Counter Component] Increment');
export const decrement = createAction('[Counter Component] Decrement');
export const reset = createAction('[Counter Component] Reset');
export const incrementByAmount = createAction(
  '[Counter Component] Increment By Amount',
  (amount: number) => ({ amount })
);
