import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class StepGuardService implements CanActivate {

  constructor(public authService: AuthService) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable <boolean> | Promise<boolean> | boolean {

    if (!this.authService.isStep1() ) {

      alert();
      return this.authService.logOut();
    }

    else {
      return this.authService.isStep1();
    }

  }


}
