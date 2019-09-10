import {Injectable} from '@angular/core';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router) {
  }

  login() {
    return localStorage.getItem('user') ? true : false;
  }

  logOut() {
    localStorage.removeItem('user');
    return this.router.navigate(['login']);
  }

  isAuth() {
    return this.login();
  }

  isAdmin() {
    const admin = JSON.parse(localStorage.getItem('user'));
    return Boolean(admin.role === 'admin');
  }
  isStep1() {
    const user = JSON.parse(localStorage.getItem('user'));
    return Boolean(user.step === 1);
  }




}
