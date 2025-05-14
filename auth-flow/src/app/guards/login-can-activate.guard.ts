import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { StorageService } from '../services/storage.service';

export const loginCanActivateGuard: CanActivateFn = (route, state) => {
  const storageService = inject(StorageService);
  const token = storageService.getAuthToken();
  const router = inject(Router);
  if (!token) {
    return true;
  } else {
    router.navigate(['/home']);
    return false;
  }
};
