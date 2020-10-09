import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthServiceService } from '../auth/auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(
    private router: Router,
    private authRequest: AuthServiceService
  ) { }
  
  canActivate(route: ActivatedRouteSnapshot): boolean | Observable<boolean> {
    console.log(route);

    return this.authRequest.hasLoggedUser().pipe(map((autenticado) => {
      if (!autenticado) {
        this.router.navigate(["login"]);
        return false;
      }

      return true;
    }));
  }
}
