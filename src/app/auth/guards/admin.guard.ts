import { CanActivateFn, Router } from '@angular/router';
import { inject, signal } from '@angular/core';

import { UserAccountResponse } from '../interfaces/user-response.types';
import { AuthService } from '../services/auth/auth.service';
import { Observable } from 'rxjs';

export const adminGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthService);
  const router = inject(Router);

  return new Observable<boolean>((observer) => {
    authService.getUserType().subscribe((userType) => {
      if (userType !== 'Coordinador') {
        router.navigate(['/unauthorized']); // Redirige si no es Coordinador
        observer.next(false);
      } else {
        observer.next(true);
      }
      observer.complete();
    });
  });

};