import { JsonPipe } from '@angular/common';
import { Component, linkedSignal, signal } from '@angular/core';

@Component({
  selector: 'app-equality',
  imports: [JsonPipe],
  templateUrl: './equality.component.html',
  styleUrl: './equality.component.css',
})
export class EqualityComponent {
  serverUser = signal<User>({
    id: 123,
    name: 'Alice',
    lastLogin: '2025 06 01 09:00:00',
  });

  //  editableUser = linkedSignal(() => this.serverUser(), {
  //    equal: (a, b) => {
  //      console.log('a', a);
  //      console.log('b', b);
  //
  //      return a.name === b.name;
  //    },
  //  });

  editableUser = linkedSignal({
    source: this.serverUser,
    computation: (user) => user,
    equal: (a, b) => a.name === b.name,
  });

  updateName() {
    this.editableUser.update((user) => ({
      ...user,
      name: user.name + ' (edited)',
    }));
  }
  updateLastLogin() {
    this.editableUser.update((user) => ({
      ...user,
      lastLogin: new Date().toISOString(),
    }));
  }

  saveChanges() {
    this.serverUser.set({ ...this.editableUser() });
  }
}

interface User {
  id: number;
  name: string;
  lastLogin: string;
}
