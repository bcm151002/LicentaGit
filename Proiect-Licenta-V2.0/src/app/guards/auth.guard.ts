import {CanActivateFn, Router} from '@angular/router';
import {LoginService} from "../services/login/login.service";
import {inject} from "@angular/core";

export const authGuard: CanActivateFn = (route , state) => {
  const loginService = inject(LoginService);
  const router = inject(Router);

  const isLoggedIn = loginService.isLoggedIn();

  if (state.url === '/login' && isLoggedIn) {
    router.navigate(['/home']);
    return false;
  }

  if (!isLoggedIn && state.url !== '/login') {
    router.navigate(['/login']);
    return false;
  }

  return true;

};
