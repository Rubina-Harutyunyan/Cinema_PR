import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UsersService} from '../shared/users.service';
import {Router} from '@angular/router';
import {AuthService} from '../shared/auth.service';
import {MatDialog} from '@angular/material';
import {MyDialogComponent} from '../my-dialog/my-dialog.component';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  user;
  users: any = [];

  filteredItem: any;
  text: string;
  name: string;
  constructor(
    private usersService: UsersService,
    private router: Router,
    private authService: AuthService,
    public dialog: MatDialog,
    private http: HttpClient
  ) {
  }

  ngOnInit() {
    this.usersService.getUsers().subscribe(data => {
      this.users = data;
    });

    this.user = new FormGroup({
      userName: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }







  login() {
    // this.http.post('http://localhost:3000/users/authenticate', this.user.value).subscribe(
    //   res => {
    //     console.log('res', res);
    //   }, error1 => {
    //     console.log(error1);
    //   }
    // )
    console.log('user', this.user.value);
    this.filteredItem = this.users.filter((item) => {
      return item.userName === this.user.value.userName && item.password === this.user.value.password;
    });
    if (!this.filteredItem.length) {
      alert("User doesn't found");
      this.user.reset();
    } else {
      if (this.filteredItem[0].role === 'admin') {
        localStorage.setItem('user', JSON.stringify(this.filteredItem[0]));
        this.authService.isAdmin();
        this.router.navigate(['/admin']);
      } else  if (this.filteredItem[0].role === 'user' && this.filteredItem[0].step === 0) {
          localStorage.setItem('user', JSON.stringify(this.filteredItem[0]));
          this.authService.isAuth();
          this.router.navigate(['/signUp2']);
      } else {
        if (this.filteredItem[0].role === 'user' && this.filteredItem[0].step === 1) {
          localStorage.setItem('user', JSON.stringify(this.filteredItem[0]));
           this.authService.isStep1();
           this.router.navigate(['/user']);
        }
      }
      console.log(this.filteredItem);
    }

  }
}
