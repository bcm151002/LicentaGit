import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import {LoginService} from "../services/login/login.service";

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const loginService = inject(LoginService); // Injectăm serviciul LoginService pentru acces la token
  const token = loginService.getToken();

  if (token) {
    // Clonăm cererea pentru a adăuga header-ul Authorization
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
    return next(authReq); // Trimitem cererea clonată mai departe
  }

  return next(req); // Dacă nu există token, trimitem cererea nemodificată
};
