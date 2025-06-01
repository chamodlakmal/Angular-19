import { Component, computed, linkedSignal, signal } from '@angular/core';

@Component({
  selector: 'app-user-form',
  imports: [],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css',
})
export class UserFormComponent {
  username = signal('John');

  editUsername = linkedSignal(() => this.username());

  isModified = computed(() => this.editUsername() !== this.username());

  updateUsername(event: Event) {
    const input = event.target as HTMLInputElement;
    const username = input.value;
    this.editUsername.set(username);
  }

  forceRefresh() {
    this.username.update((name) => name + ' ');
  }

  saveChanges() {
    if (this.isModified()) {
      this.username.set(this.editUsername());
      console.log('Changes saved:', this.username());
    }
  }
}
