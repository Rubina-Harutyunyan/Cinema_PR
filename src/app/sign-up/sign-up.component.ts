import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {UsersService} from '../shared/users.service';
import {Router} from '@angular/router';
import {AuthService} from '../shared/auth.service';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})

export class SignUpComponent implements OnInit {
  newUser: FormGroup;
  users: any = [];

  constructor(private usersService: UsersService, private router: Router, private authService: AuthService, private http: HttpClient) {
  }

  ngOnInit() {
    this.usersService.getUsers().subscribe(data => {
      this.users = data;
    });
    this.newUser = new FormGroup({
      userName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(40), this.userName]),
      password: new FormControl('', [Validators.required, Validators.minLength(3), Validators.pattern('(0|[A-Z])[a-z]{3,}[0-9]*')]),
      confirmPassword: new FormControl('', [Validators.required]),
      role: new FormControl('user'),
      step: new FormControl(0)
    });
  }

  onSubmit() {
    const found = this.users.find(item => {
      return this.newUser.get('userName').value === item.userName;
    });
    if (found) {
      alert('Enter another username');
    } else if (this.newUser.get('password').value !== this.newUser.get('confirmPassword').value) {
      alert('Passwords don\'t match');
    } else {
      const newUser = this.newUser.value;
      this.http.post('http://localhost:3000/users/', {
        'userName': newUser.userName,
        'password': newUser.password,
        'role': newUser.role,
        'step': newUser.step
      }).subscribe(
        (res: any) => {
          localStorage.setItem('user', JSON.stringify(newUser));
          // this.authService.isAuth();
          this.router.navigate(['/signUp2']);
        },
        (error) => {
          console.log('error', error);
        }
      );

    }
  }

  userName(control: AbstractControl) {
    if (control.value.replace(/[^A-Za-z]/gi, '').length < 3) {
      return {userName: true};
    }
    return null;
  }
}
