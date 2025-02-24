import { CanActivateFn, Router } from '@angular/router';
import { inject, signal } from '@angular/core';

import { UserAccountResponse } from '../interfaces/user-response.types';
import { AuthService } from '../services/auth/auth.service';
import { Observable } from 'rxjs';

export const adminGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthService);
  const router = inject(Router);

  return new Observable<boolean>((observer) => {
    authService.isAuthenticated().subscribe((isAuth) => {
      if (!isAuth) {
        router.navigate(['/acceso/iniciar-sesion']); 
      }
      observer.next(isAuth);
      observer.complete();
    });
  });

};