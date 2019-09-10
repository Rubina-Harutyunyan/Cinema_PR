import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UsersService} from '../shared/users.service';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {AuthService} from '../shared/auth.service';

@Component({
  selector: 'app-sign-up2',
  templateUrl: './sign-up2.component.html',
  styleUrls: ['./sign-up2.component.css']
})

export class SignUp2Component implements OnInit {
  newUser: any = [];
  newUserObj = {};
  users: any = [];
  id: number;
  user;
  filteredUser: any;

  constructor(
    private usersService: UsersService,
    private router: Router,
    private http: HttpClient,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {
  }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user')) ? (JSON.parse(localStorage.getItem('user'))) : null;

    this.usersService.getUsers().subscribe(data => {
      this.users = data;
    });
    console.log('user', this.user);

    this.newUser = new FormGroup({
      firstName: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.pattern('(0|[A-Z])[A-Za-z\\S]*\\D')]),
      lastName: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.pattern('(0|[A-Z])[A-Za-z\\S]*\\D')]),
      address: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.pattern('(0|[A-Z])[a-z]*.[?=0-9]*')]),
      phone: new FormControl(null, [Validators.required, Validators.pattern('(00[0-9]{10,15})')]),
      step: new FormControl(1),
      userName: new FormControl(this.user.userName)


    });
    console.log(this.newUser);
  }

  onSubmit() {
    this.filteredUser = this.users.filter((item) => {
      return item.userName === this.user.userName;
    });
    if (this.filteredUser) {
      const user = JSON.parse(localStorage.getItem('user'));
      this.newUserObj = this.newUser.value;
      this.id = this.filteredUser[0].id;
      console.log('gjgjh', this.id);
      this.http.patch('http://localhost:3000/users/' + this.id, this.newUserObj).subscribe(
        (res: any) => {
          console.log('new', this.newUserObj);
          console.log('res', res);
        },
        error1 => {
          console.log('error', error1);
        }
      );

    }
    localStorage.setItem('user', JSON.stringify(this.newUserObj));

    console.log('hhfh', this.id);

    this.authService.isStep1();
    this.router.navigate(['/user']);
  }


}


