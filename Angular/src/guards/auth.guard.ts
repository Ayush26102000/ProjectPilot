import { Injectable } from '@angular/core';
import { CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
    if (typeof window !== 'undefined' && sessionStorage.getItem('username')) {
      return true;
    } else {
     
      return this.router.createUrlTree(['/LogInPage']);
    }
  }
}

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const authGuardService = new AuthGuardService(new Router()); // Dependency injection workaround
  return authGuardService.canActivate(route, state);
};
