import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { AuthService } from '../services/auth.service';
import { AuthStatus } from '../interfaces/auth-status.enum';



export const isAuthenticatedGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthService);
  const router = inject(Router);

  console.log({ status: authService.authStatus() })

  if (authService.authStatus() === AuthStatus.autenticado) {
    return true;
  }

  router.navigateByUrl('login');
  return false;
};



